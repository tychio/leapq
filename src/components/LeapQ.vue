<template>
  <main>
    <info-form v-if="step === 1" 
      :info="info"
      :selectedLanguages="languages"
      @updated="updatedLanguages"
    ></info-form>

    <template v-if="step === 2">
      <language-sortable
        :languages="languages"
        :tip="'掌握程度'"
        @sorted="sortByLevel"
      ></language-sortable>
      <rate-selector
        :languages="levelLanguages"
        @updated="updatedRates"
      ></rate-selector>
    </template>

    <div style="text-align: center;">
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
    </div>
  </main>
</template>

<script>
import InfoForm from './InfoForm'
import LanguageSortable from './LanguageSortable'
import RateSelector from './RateSelector'

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
      },
      levelRates: [],
      languages: [],
      levelLanguages: []
    }
  },
  methods: {
    next: function () {
      this.step++
    },
    prev: function () {
      this.step = (this.step - 1) || 1
    },
    updatedLanguages: function (languages) {
      this.levelLanguages = this.languages = languages
    },
    sortByLevel: function (languages) {
      this.levelLanguages = languages
    },
    updatedRates: function (rates) {
      this.levelRates = rates
    }
  },
  components: {
    'info-form': InfoForm,
    'language-sortable': LanguageSortable,
    'rate-selector': RateSelector
  }
}
</script>

<style>
main {
  width: 840px;
  margin: auto;
}
</style>

