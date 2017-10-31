<template>
  <main>
    <section v-show="step === 1" >
      <info-form
        :info="info"
        :selectedLanguages="languages"
        @updated="updatedLanguages"
      ></info-form>
    </section>

    <section v-show="step === 2">
      <language-sortable
        :languages="levelLanguages"
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
    </section>

    <section v-show="step === 3">
      <language-sortable
        :languages="timeLanguages"
        :tip="'学习语言的时间先后顺序'"
        @sorted="sortByTime"
      ></language-sortable>
      <num-selector
        :languages="timeLanguages"
        @updated="updatedAge"
      ></num-selector>
      <bilingual
        :languages="timeLanguages"
        :bilingual="bilingual"
        @updated="updatedBilingual"
      ></bilingual>
    </section>
    <section v-show="step === 4">
      <h3>请根据说明对下列项目进行评分</h3>
      <score-table
        :languages="timeLanguages"
        @updated="updateScore"
      ></score-table>
    </section>
    <div style="text-align: center;">
      <transition name="fade">
        <Alert v-if="warning" type="warning" show-icon>
          {{warning}}
          <span slot="desc"></span>
        </Alert>
      </transition>
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
import Bilingual from './Bilingual'
import * as _ from 'lodash'

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
      levelBarriers: {},
      timeAges: {},
      bilingual: {},
      score: {},
      warning: ''
    }
  },
  methods: {
    next: function () {
      if (this.step === 1) {
        this.warning = this.validStep1()
      } else if (this.step === 3) {
        this.warning = this.validStep3()
      } else if (this.step === 4) {
        this.warning = this.validStep4()
      }
      if (!this.warning) {
        this.step = this.step + 1
      }
    },
    prev: function () {
      this.step = (this.step - 1) || 1
    },
    updatedLanguages: function (languages) {
      this.languages = languages
      this.timeLanguages = JSON.parse(JSON.stringify(languages))
      this.levelLanguages = JSON.parse(JSON.stringify(languages))
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
    },
    updatedBilingual: function (bilingual) {
      this.bilingual = bilingual
    },
    validate: function (names, data) {
      return _.some(names, name => {
        const value = data[name]
        let isEmpty = false
        if (_.isDate(value)) {
          isEmpty = !(value > 0)
        } else if (_.isObject(value)) {
          isEmpty = _.isEmpty(value)
        } else {
          isEmpty = !value
        }
        if (isEmpty) {
          console.log(name)
        }
        return isEmpty
      })
    },
    validStep1: function () {
      const invalid = this.validate([
        'lastname',
        'firstname',
        'birthday',
        'age',
        'university',
        'college',
        'major',
        'studentnumber',
        'phone',
        'wechat'
      ], this.info)
      if (invalid) {
        return '请完整填写表单。'
      }

      if (this.languages.length < 3) {
        return '请至少选择你最擅长的 3 种语言'
      }
    },
    validStep3: function () {
      const invalid = this.validate([
        'first',
        'study',
        'speak',
        'normal',
        'school',
        'home',
        'community'
      ], this.timeAges)
      if (invalid) {
        return '还有没有选择的条目'
      }
    },
    validStep4: function () {
      const levelValid = this.validate([
        'speak',
        'listen',
        'read'
      ], this.score.level)
      const impactValid = this.validate([
        'family',
        'friend',
        'school',
        'broadcast',
        'read',
        'tv',
        'network',
        'social'
      ], this.score.impact)

      const touchValid = this.validate([
        'family',
        'friend',
        'school',
        'broadcast',
        'read',
        'tv',
        'network',
        'social'
      ], this.score.touch)

      const oralValid = this.validate([
        'speak',
        'listen'
      ], this.score.oral)
      if (levelValid || impactValid || touchValid || oralValid) {
        return '请对所有条目进行评分'
      }
    }
  },
  components: {
    'info-form': InfoForm,
    'language-sortable': LanguageSortable,
    'rate-selector': RateSelector,
    'num-selector': NumSelector,
    'check-list': CheckList,
    'score-table': ScoreTable,
    'bilingual': Bilingual
  }
}
</script>

<style>
main {
  width: 840px;
  margin: auto;
  font-size: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>

