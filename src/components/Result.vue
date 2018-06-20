<template>
  <div>
    <Spin size="large" fix v-if="loading"></Spin>
    <section>
      <Button type="info" @click.native="download">Export</Button>
      <Select v-model="type" style="width: 160px;">
        <Option v-for="item in kinds" :value="item.key" :key="item.key">{{ item.label }}</Option>
      </Select>
    </section>
    <section>
      <Table ref="table" border stripe height="600" :columns="fullColumns" :data="list"></Table>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as _ from 'lodash'

  export default {
    name: 'Result',
    data () {
      const WIDTH = 160
      return {
        WIDTH: WIDTH,
        loading: false,
        list: [],
        cached: {},
        type: 'lex_ug',
        kinds: [
          { key: 'lex_ug', label: 'Lexical Uyghur' },
          { key: 'lex_cn', label: 'Lexical Chinese' },
          { key: 'flanker', label: 'Flanker Test' },
          { key: 'simon', label: 'Simon Test' },
          { key: 'pic', label: 'Picture Naming' }
        ],
        groupMap: {
          'lang1': 'L1',
          'lang2': 'L2',
          'balance': 'Balance'
        },
        columns: [
          {
            type: 'index',
            title: '#',
            key: 'id',
            fixed: 'left',
            width: 40,
            align: 'center'
          },
          {
            title: 'Participant ID',
            key: 'phone',
            width: 140,
            fixed: 'left',
            exported: true
          },
          {
            title: 'Dominance Type',
            key: 'kind',
            width: 160,
            sortable: true,
            fixed: 'left',
            exported: true
          },
          {
            title: 'Ave RT',
            key: 'average_speed',
            width: WIDTH,
            exported: true
          },
          {
            title: 'Sum Acc',
            key: 'sum_accuracy',
            width: WIDTH,
            exported: true
          }
        ],
        columnsByKinds: {
          'lex_cn': [
            {
              title: 'Ave Cnon RT',
              key: 'average_nonword_speed'
            },
            {
              title: 'Ave Cword RT',
              key: 'average_word_speed'
            },
            {
              title: 'Sum Cnon Acc',
              key: 'sum_nonword_accuracy'
            },
            {
              title: 'Sum Cword Acc',
              key: 'sum_word_accuracy'
            }
          ],
          'lex_ug': [
            {
              title: 'Ave Unon RT',
              key: 'average_nonword_speed'
            },
            {
              title: 'Ave Uword RT',
              key: 'average_word_speed'
            },
            {
              title: 'Sum Unon Acc',
              key: 'sum_nonword_accuracy'
            },
            {
              title: 'Sum Uword Acc',
              key: 'sum_word_accuracy'
            }
          ],
          'flanker': [
            {
              title: 'F Ave Con RT',
              key: 'average_con_speed'
            },
            {
              title: 'F Ave Incon RT',
              key: 'average_incon_speed'
            },
            {
              title: 'F Ave Neutral RT',
              key: 'average_neu_speed'
            },
            {
              title: 'F Sum Con Acc',
              key: 'sum_con_accuracy'
            },
            {
              title: 'F Sum Incon Acc',
              key: 'sum_incon_accuracy'
            },
            {
              title: 'F Sum Neutral Acc',
              key: 'sum_neu_accuracy'
            }
          ],
          'simon': [
            {
              title: 'S Ave Con RT',
              key: 'average_con_speed'
            },
            {
              title: 'S Ave Incon RT',
              key: 'average_incon_speed'
            },
            {
              title: 'S Ave Neutral RT',
              key: 'average_neu_speed'
            },
            {
              title: 'S Sum Con Acc',
              key: 'sum_con_accuracy'
            },
            {
              title: 'S Sum Incon Acc',
              key: 'sum_incon_accuracy'
            },
            {
              title: 'S Sum Neutral Acc',
              key: 'sum_neu_accuracy'
            }
          ],
          'pic': [
            {
              title: 'P Ave Cn RT',
              key: 'average_cn_speed'
            },
            {
              title: 'P Ave Ug RT',
              key: 'average_ug_speed'
            },
            {
              title: 'P Sum Cn Acc',
              key: 'sum_cn_accuracy'
            },
            {
              title: 'P Sum Ug Acc',
              key: 'sum_ug_accuracy'
            },
            {
              title: 'Ave Switch RT',
              key: 'average_switch_speed'
            },
            {
              title: 'Ave Nonswi RT',
              key: 'average_keep_speed'
            },
            {
              title: 'Sum Switch Acc',
              key: 'sum_switch_accuracy'
            },
            {
              title: 'Sum Nonswi Acc',
              key: 'sum_keep_accuracy'
            },
            {
              title: 'Ave Switch Cn RT',
              key: 'average_switch_cn_speed'
            },
            {
              title: 'Ave Switch Ug RT',
              key: 'average_switch_ug_speed'
            },
            {
              title: 'Ave Nonswi Cn RT',
              key: 'average_keep_cn_speed'
            },
            {
              title: 'Ave Nonswi Ug RT',
              key: 'average_keep_ug_speed'
            },
            {
              title: 'Sum Switch Cn Acc',
              key: 'sum_switch_cn_accuracy'
            },
            {
              title: 'Sum Switch Ug Acc',
              key: 'sum_switch_ug_accuracy'
            },
            {
              title: 'Sum Nonswi Cn Acc',
              key: 'sum_keep_cn_accuracy'
            },
            {
              title: 'Sum Nonswi Ug Acc',
              key: 'sum_keep_ug_accuracy'
            }
          ]
        }
      }
    },
    watch: {
      type: function () {
        this.load()
      }
    },
    methods: {
      download: function () {
        const data = this.$refs.table.data
        this.$refs.table.exportCsv({
          filename: 'Results ' + this.kindString,
          columns: this.fullColumns.filter(column => !!column.exported),
          data: data.map((item, index) => _.extend(item, { id: index + 1 }))
        })
      },
      load: function () {
        if (this.loading) {
          return
        }
        if (this.cached[this.type]) {
          this.list = this.cached[this.type]
        } else {
          this.loading = true
          axios.get(process.env.SERVER_URL.EXPERIMENT, {
            params: {
              type: this.type
            }
          }).then(response => {
            this.list = this.cached[this.type] = this[this.type + 'Handler'](response.data)
            this.loading = false
          }).catch(error => {
            console.error(error)
            this.loading = false
          })
        }
      },
      formatNum: function (num) {
        return _.round(num, 2).toFixed(2)
      },
      picHandler: function (data) {
        return this.baseHandler(data, ['switch', 'keep', 'cn', 'ug', 'switch_cn', 'switch_ug', 'keep_cn', 'keep_ug'], true)
      },
      simonHandler: function (data) {
        return this.baseHandler(data, ['con', 'incon', 'neu'])
      },
      flankerHandler: function (data) {
        return this.baseHandler(data, ['con', 'incon', 'neu'])
      },
      lex_cnHandler: function (data) {
        return this.baseHandler(data, ['nonword', 'word'])
      },
      lex_ugHandler: function (data) {
        return this.baseHandler(data, ['nonword', 'word'])
      },
      baseHandler: function (data, extra, like) {
        const list = []
        let index = 1
        _.each(data, (samples, groupName) => {
          _.each(samples, (items, phone) => {
            const averageSpeed = []
            const averageExtraSpeed = _.chain(extra).groupBy(key => key).mapValues(obj => []).value()
            const sample = {
              id: index++,
              kind: '',
              phone: phone,
              average_speed: 0,
              sum_accuracy: 0,
              min: 0,
              max: 0
            }
            _.each(items, item => {
              sample.kind = this.groupMap[groupName] + '_' + item.code
              if (item.inlier > 0) {
                averageSpeed.push(item.inlier)
                if (like) {
                  _.each(averageExtraSpeed, (extraItem, key) => {
                    if (_.includes(item.combination, key)) {
                      averageExtraSpeed[key].push(item.inlier)
                    }
                  })
                } else {
                  if (averageExtraSpeed[item.combination]) {
                    averageExtraSpeed[item.combination].push(item.inlier)
                  }
                }
              }
              sample.min = sample.min || this.formatNum(item.min)
              sample.max = sample.max || this.formatNum(item.max)
            })
            if (averageSpeed.length) {
              sample.average_speed = this.formatNum(_.sum(averageSpeed) / averageSpeed.length)
              sample.sum_accuracy = averageSpeed.length
            }

            _.each(averageExtraSpeed, (item, key) => {
              const sumSpeed = _.sum(item)
              const accuracyCount = item.length
              sample[`average_${key}_speed`] = this.formatNum(sumSpeed / accuracyCount)
              sample[`sum_${key}_accuracy`] = accuracyCount
            })
            list.push(sample)
          })
        })
        return list
      }
    },
    computed: {
      fullColumns: function () {
        const kindColumns = this.columnsByKinds[this.type] || {}
        _.each(kindColumns, kindColumn => {
          kindColumn.exported = true
          kindColumn.width = this.WIDTH
        })
        return _.concat(this.columns, kindColumns)
      },
      kindString: function () {
        var currentKind = _.find(this.kinds, kind => kind.key === this.type)
        if (currentKind) {
          return currentKind.label
        }
      }
    },
    mounted: function () {
      this.load()
    }
  }
</script>

<style>
  section {
    padding: 10px;
  }

  .ivu-spin-fix {
    position: fixed;
  }
</style>