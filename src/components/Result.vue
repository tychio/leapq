<template>
  <div>
    <section>
      <Button type="info" @click.native="download">Export</Button>
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
        type: 'lex_ug',
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
          ]
        }
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
        axios.get(process.env.SERVER_URL.EXPERIMENT, {
          params: {
            type: this.type
          }
        }).then(response => {
          this.list = this[this.type + 'Handler'](response.data)
        }).catch(error => {
          console.error(error)
        })
      },
      formatNum: function (num) {
        return _.round(num, 2).toFixed(2)
      },
      simonHandler: function (data) {
        return this.lex_ugHandler(data)
      },
      flankerHandler: function (data) {
        return this.lex_ugHandler(data)
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