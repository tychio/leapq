<template>
  <div>
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
      return {
        list: [],
        cached: {},
        type: 'lex_ug',
        kinds: [
          { key: 'lex_ug', label: 'Lexical Uyghur' },
          { key: 'lex_cn', label: 'Lexical Chinese' },
          { key: 'flanker', label: 'Flanker Test' },
          { key: 'simon', label: 'Simon Test' }
        ],
        groupMap: {
          'lang1': 'L1',
          'lang2': 'L2',
          'balance': 'Balance'
        },
        columns: [
          {
            type: 'index',
            title: 'Idx',
            key: 'id',
            width: 60,
            fixed: 'left',
            align: 'center'
          },
          {
            title: 'Participant ID',
            key: 'phone',
            fixed: 'left',
            width: 160,
            exported: true
          },
          {
            title: 'Dominance Type',
            key: 'kind',
            exported: true
          }
        ],
        columnsByKinds: {
          'lex_cn': [
            {
              title: 'Average Cnon RT',
              key: 'average_nonword_speed',
              exported: true
            },
            {
              title: 'Average Cword RT',
              key: 'average_word_speed',
              exported: true
            },
            {
              title: 'Sum Cnon Acc',
              key: 'sum_nonword_accuracy',
              exported: true
            },
            {
              title: 'Sum Cword Acc',
              key: 'sum_word_accuracy',
              exported: true
            },
            {
              title: 'Average Cn RT',
              key: 'average_speed',
              exported: true
            },
            {
              title: 'Sum Cn Acc',
              key: 'sum_accuracy',
              exported: true
            },
            {
              title: 'Minimum Threshold',
              key: 'min'
            },
            {
              title: 'Maximum Threshold',
              key: 'max'
            }
          ],
          'lex_ug': [
            {
              title: 'Average Unon RT',
              key: 'average_nonword_speed',
              exported: true
            },
            {
              title: 'Average Uword RT',
              key: 'average_word_speed',
              exported: true
            },
            {
              title: 'Sum Unon Acc',
              key: 'sum_nonword_accuracy',
              exported: true
            },
            {
              title: 'Sum Uword Acc',
              key: 'sum_word_accuracy',
              exported: true
            },
            {
              title: 'Average Ug RT',
              key: 'average_speed',
              exported: true
            },
            {
              title: 'Sum Ug Acc',
              key: 'sum_accuracy',
              exported: true
            },
            {
              title: 'Minimum Threshold',
              key: 'min'
            },
            {
              title: 'Maximum Threshold',
              key: 'max'
            }
          ],
          'flanker': [
            {
              title: 'Average Con RT',
              key: 'average_con_speed',
              exported: true
            },
            {
              title: 'Average Incon RT',
              key: 'average_incon_speed',
              exported: true
            },
            {
              title: 'Average Neutral RT',
              key: 'average_neu_speed',
              exported: true
            },
            {
              title: 'Sum Con Acc',
              key: 'sum_con_accuracy',
              exported: true
            },
            {
              title: 'Sum Incon Acc',
              key: 'sum_incon_accuracy',
              exported: true
            },
            {
              title: 'Sum Neutral Acc',
              key: 'sum_neu_accuracy',
              exported: true
            },
            {
              title: 'Average RT',
              key: 'average_speed',
              exported: true
            },
            {
              title: 'Sum Acc',
              key: 'sum_accuracy',
              exported: true
            },
            {
              title: 'Minimum Threshold',
              key: 'min'
            },
            {
              title: 'Maximum Threshold',
              key: 'max'
            }
          ],
          'simon': [
            {
              title: 'Average Right RT',
              key: 'average_right_speed',
              exported: true
            },
            {
              title: 'Average Left RT',
              key: 'average_left_speed',
              exported: true
            },
            {
              title: 'Average Center RT',
              key: 'average_center_speed',
              exported: true
            },
            {
              title: 'Sum Right Acc',
              key: 'sum_right_accuracy',
              exported: true
            },
            {
              title: 'Sum Left Acc',
              key: 'sum_left_accuracy',
              exported: true
            },
            {
              title: 'Sum Center Acc',
              key: 'sum_center_accuracy',
              exported: true
            },
            {
              title: 'Average RT',
              key: 'average_speed',
              exported: true
            },
            {
              title: 'Sum Acc',
              key: 'sum_accuracy',
              exported: true
            },
            {
              title: 'Minimum Threshold',
              key: 'min'
            },
            {
              title: 'Maximum Threshold',
              key: 'max'
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
          filename: 'Participants',
          columns: this.fullColumns.filter(column => !!column.exported),
          data: data.map((item, index) => _.extend(item, { id: index + 1 }))
        })
      },
      load: function () {
        if (this.cached[this.type]) {
          this.list = this.cached[this.type]
        } else {
          axios.get(process.env.SERVER_URL.EXPERIMENT, {
            params: {
              type: this.type
            }
          }).then(response => {
            this.list = this.cached[this.type] = this[this.type + 'Handler'](response.data)
          }).catch(error => {
            console.error(error)
          })
        }
      },
      formatNum: function (num) {
        return _.round(num, 2).toFixed(2)
      },
      simonHandler: function (data) {
        const list = []
        let index = 1
        _.each(data, (samples, groupName) => {
          _.each(samples, (items, phone) => {
            const averageSpeed = []
            const averageRightSpeed = []
            const averageLeftSpeed = []
            const averageCenterSpeed = []
            const sample = {
              id: index++,
              kind: this.groupMap[groupName],
              phone: phone,
              average_speed: 0,
              average_right_speed: 0,
              average_left_speed: 0,
              average_center_speed: 0,
              sum_right_accuracy: 0,
              sum_left_accuracy: 0,
              sum_center_accuracy: 0,
              sum_accuracy: 0,
              min: 0,
              max: 0
            }
            _.each(items, item => {
              if (item.inlier > 0) {
                averageSpeed.push(item.inlier)
                if (item.question.direction === 'right') {
                  averageRightSpeed.push(item.inlier)
                } else if (item.question.direction === 'left') {
                  averageLeftSpeed.push(item.inlier)
                } else {
                  averageCenterSpeed.push(item.inlier)
                }
              }
              sample.min = sample.min || this.formatNum(item.min)
              sample.max = sample.max || this.formatNum(item.max)
            })
            if (averageSpeed.length) {
              sample.average_speed = this.formatNum(_.sum(averageSpeed) / averageSpeed.length)
              sample.sum_accuracy = averageSpeed.length
            }
            if (averageRightSpeed.length) {
              sample.average_right_speed = this.formatNum(_.sum(averageRightSpeed) / averageRightSpeed.length)
              sample.sum_right_accuracy = averageRightSpeed.length
            }
            if (averageLeftSpeed.length) {
              sample.average_left_speed = this.formatNum(_.sum(averageLeftSpeed) / averageLeftSpeed.length)
              sample.sum_left_accuracy = averageLeftSpeed.length
            }
            if (averageCenterSpeed.length) {
              sample.average_center_speed = this.formatNum(_.sum(averageCenterSpeed) / averageCenterSpeed.length)
              sample.sum_center_accuracy = averageCenterSpeed.length
            }
            list.push(sample)
          })
        })
        return list
      },
      flankerHandler: function (data) {
        const list = []
        let index = 1
        _.each(data, (samples, groupName) => {
          _.each(samples, (items, phone) => {
            const averageSpeed = []
            const averageConSpeed = []
            const averageInconSpeed = []
            const averageNeuSpeed = []
            const sample = {
              id: index++,
              kind: this.groupMap[groupName],
              phone: phone,
              average_speed: 0,
              average_con_speed: 0,
              average_incon_speed: 0,
              average_neu_speed: 0,
              sum_con_accuracy: 0,
              sum_incon_accuracy: 0,
              sum_neu_accuracy: 0,
              sum_accuracy: 0,
              min: 0,
              max: 0
            }
            _.each(items, item => {
              if (item.inlier > 0) {
                averageSpeed.push(item.inlier)
                if (item.question.congruent === 'con') {
                  averageConSpeed.push(item.inlier)
                } else if (item.question.congruent === 'incon') {
                  averageInconSpeed.push(item.inlier)
                } else {
                  averageNeuSpeed.push(item.inlier)
                }
              }
              sample.min = sample.min || this.formatNum(item.min)
              sample.max = sample.max || this.formatNum(item.max)
            })
            if (averageSpeed.length) {
              sample.average_speed = this.formatNum(_.sum(averageSpeed) / averageSpeed.length)
              sample.sum_accuracy = averageSpeed.length
            }
            if (averageConSpeed.length) {
              sample.average_con_speed = this.formatNum(_.sum(averageConSpeed) / averageConSpeed.length)
              sample.sum_con_accuracy = averageConSpeed.length
            }
            if (averageInconSpeed.length) {
              sample.average_incon_speed = this.formatNum(_.sum(averageInconSpeed) / averageInconSpeed.length)
              sample.sum_incon_accuracy = averageInconSpeed.length
            }
            if (averageNeuSpeed.length) {
              sample.average_neu_speed = this.formatNum(_.sum(averageNeuSpeed) / averageNeuSpeed.length)
              sample.sum_neu_accuracy = averageNeuSpeed.length
            }
            list.push(sample)
          })
        })
        return list
      },
      lex_cnHandler: function (data) {
        return this.lex_ugHandler(data)
      },
      lex_ugHandler: function (data) {
        const list = []
        let index = 1
        _.each(data, (samples, groupName) => {
          _.each(samples, (items, phone) => {
            const averageSpeed = []
            const averageNonwordSpeed = []
            const averageWordSpeed = []
            const sample = {
              id: index++,
              kind: this.groupMap[groupName],
              phone: phone,
              average_speed: 0,
              average_word_speed: 0,
              average_nonword_speed: 0,
              sum_nonword_accuracy: 0,
              sum_accuracy: 0,
              min: 0,
              max: 0
            }
            _.each(items, item => {
              if (item.inlier > 0) {
                averageSpeed.push(item.inlier)
                if (item.question.real) {
                  averageWordSpeed.push(item.inlier)
                } else {
                  averageNonwordSpeed.push(item.inlier)
                }
              }
              sample.min = sample.min || this.formatNum(item.min)
              sample.max = sample.max || this.formatNum(item.max)
            })
            if (averageSpeed.length) {
              sample.average_speed = this.formatNum(_.sum(averageSpeed) / averageSpeed.length)
              sample.sum_accuracy = averageSpeed.length
            }
            if (averageWordSpeed.length) {
              sample.average_word_speed = this.formatNum(_.sum(averageWordSpeed) / averageWordSpeed.length)
              sample.sum_word_accuracy = averageWordSpeed.length
            }
            if (averageNonwordSpeed.length) {
              sample.average_nonword_speed = this.formatNum(_.sum(averageNonwordSpeed) / averageNonwordSpeed.length)
              sample.sum_nonword_accuracy = averageNonwordSpeed.length
            }
            list.push(sample)
          })
        })
        return list
      }
    },
    computed: {
      fullColumns: function () {
        const kindColumns = this.columnsByKinds[this.type] || {}
        return _.concat(this.columns, kindColumns)
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
</style>