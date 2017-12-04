<template>
  <div>
    <Table border height="600" :columns="columns" :data="list"></Table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Analysis',
    data () {
      return {
        list: [],
        columns: [
          {
            type: 'index',
            width: 60,
            fixed: 'left',
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name',
            fixed: 'left',
            width: 160
          },
          {
            title: 'Balance',
            key: 'balance',
            sortable: true,
            width: 200
          },
          {
            title: 'Score',
            key: 'score',
            sortable: true,
            width: 170
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
            width: 120
          },
          {
            title: 'wechat',
            key: 'Wechat',
            width: 120
          },
          {
            title: 'Phone',
            key: 'phone',
            width: 120
          }
        ]
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