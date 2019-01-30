<template>
  <section>
    <h1>Statistics</h1>
    <Table ref="table" border stripe :columns="columns" :data="statistics"></Table>
  </section>
</template>

<script>
  export default {
    name: 'Statistics',
    props: ['statistics'],
    data () {
      return {
        columns: [
          {
            type: 'index',
            title: 'Idx',
            key: 'id',
            width: 60,
            align: 'center',
            exported: true
          },
          {
            title: 'Group',
            key: 'group',
            sortable: true,
            width: 160,
            exported: true
          },
          {
            title: 'Self Score Ave',
            key: 'means_self_score',
            width: 170,
            exported: true
          },
          {
            title: 'Self Score Std',
            key: 'deviations_self_score',
            width: 170,
            exported: true
          },
          {
            title: 'Use Score Ave',
            key: 'means_use_score',
            width: 170,
            exported: true
          },
          {
            title: 'Use Score Std',
            key: 'deviations_use_score',
            width: 170,
            exported: true
          }
        ]
      }
    }
  }
</script>