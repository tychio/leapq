<template>
  <main>
    <info-form :info="info" v-if="step === 1"></info-form>

    <ButtonGroup shape="circle" size="large">
      <Button @click="prev" type="default">
        <Icon type="chevron-left"></Icon>
        <span>上一步</span>
      </Button>
      <Button @click="next" type="success">
        <span>下一步</span>
        <Icon type="chevron-right"></Icon>
      </Button>
    </ButtonGroup>
  </main>
</template>

<script>
import InfoForm from './InfoForm'

export default {
  name: 'LeapQ',
  data () {
    return {
      step: 1,
      info: {
        firstname: '',
        lastname: '',
        birthday: new Date('2000-01-01'),
        age: 20,
        gender: 0,
        university: '',
        college: '',
        major: '',
        studentnumber: '',
        phone: '',
        qq: '',
        wechat: ''
      }
    }
  },
  methods: {
    next: function () {
      this.step++
    },
    prev: function () {
      this.step = (this.step - 1) || 1
    }
  },
  components: {
    'info-form': InfoForm
  }
}
</script>

<style>
main {
  width: 840px;
  margin: auto;
}
</style>

