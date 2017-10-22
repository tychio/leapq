<template>
<Form :model="list" :label-width="200">
  <FormItem label="请勾选你出现过的情况：">
    <Row :gutter="16">
      <Col v-for="(item, name) in items" key="name">
        <Checkbox style="float: left;" v-model="list[name]" @change.native="updated">{{item}}</Checkbox>
      </Col>
    </Row>
  </FormItem>
  <FormItem label="请说明（包括矫正）：">
    <Input v-model="explanation" type="textarea" @keyup.native="updated" :autosize="{minRows: 2,maxRows: 5}"></Input>
  </FormItem>
</Form>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'CheckList',
  props: ['items'],
  data: function () {
    const list = {}
    _.each(this.items, (item, name) => {
      list[name] = false
    })
    return {
      list: list,
      explanation: ''
    }
  },
  computed: {
    results: function () {
      return {
        results: this.list,
        explanation: this.explanation
      }
    }
  },
  methods: {
    updated: function () {
      this.$emit('updated', this.results)
    }
  }
}
</script>