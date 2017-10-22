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
      <check-list
        :items="barrierTypes"
        @updated="updatedBarriers"
      ></check-list>
    </template>

    <template v-if="step === 3">
      <language-sortable
        :languages="languages"
        :tip="'学习语言的时间先后顺序'"
        @sorted="sortByTime"
      ></language-sortable>
      <num-selector
        :languages="timeLanguages"
        @updated="updatedAge"
      ></num-selector>
    </template>

    <template v-if="step === 4">
      <h3>请根据说明对下列项目进行评分</h3>
      <score-table
        :languages="timeLanguages"
        @updated="updateScore"
      ></score-table>
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
import NumSelector from './NumSelector'
import CheckList from './CheckList'
import ScoreTable from './ScoreTable'

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
      levelLanguages: [],
      timeLanguages: [],
      barrierTypes: {
        vision: '视力障碍',
        audition: '听力障碍',
        language: '语言障碍',
        study: '学习障碍'
      },
      levelBarriers: {}
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
      this.timeLanguages = this.levelLanguages = this.languages = languages
    },
    sortByLevel: function (languages) {
      this.levelLanguages = languages
    },
    sortByTime: function (languages) {
      this.timeLanguages = languages
    },
    updatedRates: function (rates) {
      this.levelRates = rates
    },
    updatedBarriers: function (barriers) {
      this.levelBarriers = barriers
    },
    updatedAge: function (ages) {
      this.timeAges = ages
    },
    updateScore: function (score) {
      this.score = score
    }
  },
  components: {
    'info-form': InfoForm,
    'language-sortable': LanguageSortable,
    'rate-selector': RateSelector,
    'num-selector': NumSelector,
    'check-list': CheckList,
    'score-table': ScoreTable
  }
}
</script>

<style>
main {
  width: 840px;
  margin: auto;
}
</style>

