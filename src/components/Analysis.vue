<template>
  <div>
    <section>
      <Button type="info" @click.native="download">Export</Button>
      <Button type="warning" @click.native="update">Refresh</Button>
    </section>
    <section>
      <Table ref="table" border stripe height="600" :columns="columns" :data="list"></Table>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as _ from 'lodash'

  export default {
    name: 'Analysis',
    data () {
      return {
        list: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            fixed: 'left',
            align: 'center'
          },
          {
            type: 'index',
            title: 'Idx',
            key: 'id',
            width: 60,
            fixed: 'left',
            align: 'center',
            exported: true
          },
          {
            title: 'Name',
            key: 'name',
            fixed: 'left',
            sortable: true,
            width: 160,
            exported: true
          },
          {
            title: 'Balance',
            key: 'balance',
            sortable: true,
            width: 200,
            exported: true
          },
          {
            title: 'Score',
            key: 'score',
            sortable: true,
            width: 170,
            exported: true
          },
          {
            title: 'L1 Start Age',
            key: 'lang1_start_age',
            width: 120
          },
          {
            title: 'L2 Start Age',
            key: 'lang2_start_age',
            width: 120
          },
          {
            title: 'L1 Learn Age',
            key: 'lang1_learn_age',
            width: 120
          },
          {
            title: 'L2 Learn Age',
            key: 'lang2_learn_age',
            width: 120
          },
          {
            title: 'L1 L Inst Age',
            key: 'lang1_l_instruction_age',
            width: 120
          },
          {
            title: 'L2 L Inst Age',
            key: 'lang2_l_instruction_age',
            width: 120
          },
          {
            title: 'L1 C Inst Age',
            key: 'lang1_c_instruction_age',
            width: 120
          },
          {
            title: 'L2 C Inst Age',
            key: 'lang2_c_instruction_age',
            width: 120
          },
          {
            title: 'QQ',
            key: 'qq',
            width: 120,
            exported: true
          },
          {
            title: 'Wechat',
            key: 'wechat',
            width: 120,
            exported: true
          },
          {
            title: 'Phone',
            key: 'phone',
            width: 120,
            exported: true
          }
        ]
      }
    },
    methods: {
      download: function () {
        const data = this.$refs.table.getSelection()
        this.$refs.table.exportCsv({
          filename: 'Participants',
          columns: this.columns.filter(column => !!column.exported),
          data: data.map((item, index) => _.extend(item, { id: index + 1 }))
        })
      },
      update: function () {
        axios.post(process.env.SERVER_URL.ANALYSIS)
        .then(response => {
          this.load()
        }).catch(error => {
          console.error(error)
        })
      },
      load: function () {
        axios.get(process.env.SERVER_URL.ANALYSIS)
        .then(response => {
          this.list = response.data
        }).catch(error => {
          console.error(error)
        })
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