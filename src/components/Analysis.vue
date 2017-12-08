<template>
  <div>
    <section>
      <Button type="info" @click.native="download">Export</Button>
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
            title: 'Reading Use',
            key: 'reading_use',
            sortable: true,
            width: 170
          },
          {
            title: 'Speaking Use',
            key: 'speaking_use',
            sortable: true,
            width: 170
          },
          {
            title: 'Listening Use',
            key: 'listening_use',
            sortable: true,
            width: 170
          },
          {
            title: 'Writing Use',
            key: 'writing_use',
            sortable: true,
            width: 170
          },
          {
            title: 'Reading Self',
            key: 'reading_self',
            sortable: true,
            width: 170
          },
          {
            title: 'Speaking Self',
            key: 'speaking_self',
            sortable: true,
            width: 170
          },
          {
            title: 'Listening Self',
            key: 'listening_self',
            sortable: true,
            width: 170
          },
          {
            title: 'QQ',
            key: 'qq',
            width: 120,
            exported: true
          },
          {
            title: 'wechat',
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
      }
    },
    mounted: function () {
      axios.get(process.env.SERVER_URL.ANALYSIS)
      .then(response => {
        this.list = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  }
</script>

<style>
  section {
    padding: 10px;
  }
</style>