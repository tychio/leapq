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
    name: 'Result',
    data () {
      return {
        list: [],
        type: 'lex_ug',
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
            title: 'Participant_ID',
            key: 'phone',
            fixed: 'left',
            width: 160,
            exported: true
          },
          {
            title: 'Dominance_Type',
            key: 'kind',
            exported: true
          },
          {
            title: 'Filtered_Results',
            key: 'filtered_results',
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
      load: function () {
        axios.get(process.env.SERVER_URL.EXPERIMENT, {
          params: {
            type: this.type
          }
        }).then(response => {
          console.log(response.data)
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