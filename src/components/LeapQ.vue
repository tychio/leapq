<template>
  <main>
    <div class="slogon" v-show="showSlogon">
      <p>你好， 同学！</p>
      <p>非常感谢你能填写调查问卷，参与到我们语言研究团队的调研工作中。</p>
      <p>请依照你个人语言经历和水平，填写真实有效的信息。研究人员会根据你提供的语言经历数据，筛选出能进入下一步有偿实验环节的候选人，届时我们将通过你填写的联系方式（微信或手机号）与你联系。</p>
      <p class="assert"><small><i>研究数据收集仅用于语言学学术研究，保障个人隐私。研究问卷填写截止日期为{{slogonMonth}}月{{slogonDay}}日。</i></small></p>
    </div>
    <Steps :current="step - 1">
        <Step title="个人信息" content="填写包括联系方式的个人信息"></Step>
        <Step title="排列语言" content="选择所学语言并对其排序"></Step>
        <Step title="语言使用" content="各语言使用频率"></Step>
        <Step title="语言经历" content="各语言不同情况的经历"></Step>
        <Step title="双语情况" content="若存在，填写在不同场景中的双语经历"></Step>
        <Step title="语言自评" content="针对自身语言在不同场景和条件下的语言能力进行评分"></Step>
        <Step title="完成问卷" content=""></Step>
    </Steps>
    <section v-show="step === 1" >
      <info-form
        :info="info"
      ></info-form>
    </section>

    <section v-show="step === 2">
      <language-selector
        :selectedLanguages="languages"
        @updated="updatedLanguages">
      </language-selector>
      <language-sortable
        :languages="levelLanguages"
        :tip="'掌握程度最好的语言开始'"
        @sorted="sortByLevel"
      ></language-sortable>
      <language-sortable
        :languages="timeLanguages"
        :tip="'语言学习的时间先后顺序'"
        @sorted="sortByTime"
      ></language-sortable>
    </section>
    <section v-show="step === 3">
      <rate-selector
        :languages="levelLanguages"
        @updated="updatedRates"
      ></rate-selector>
      <check-list
        :items="barrierTypes"
        @updated="updatedBarriers"
      ></check-list>
    </section>

    <section v-show="step === 4">
      <num-selector
        :languages="timeLanguages"
        @updated="updatedAge"
      ></num-selector>
    </section>
    <section v-show="step === 5">
      <h3>若存在双语环境，请填写各环境下的语言经历</h3>
      <bilingual
        :languages="timeLanguages"
        :bilingual="bilinguals.school"
        @updated="updatedBilingual('school', $event)"
        :text="{
          is: '是否在双语班或双语学校进行过学习？',
          explain: '双语班、双语学校指的是在学校的教学中会使用2种语言学习如物理、化学等文化课程。',
          which: '请选出该学校使用的哪2种语言',
          how: '你在双语学校学习了多少年'
        }"
      ></bilingual>
      <bilingual
        :languages="timeLanguages"
        :bilingual="bilinguals.home"
        @updated="updatedBilingual('home', $event)"
        :text="{
          is: '是否在家里使用过双语？',
          explain: '例如在家与父母用维汉双语进行交流。',
          which: '请选在家里使用的2种语言',
          how: '你在家里使用双语多少年'
        }"
      ></bilingual>
      <bilingual
        :languages="timeLanguages"
        :bilingual="bilinguals.community"
        @updated="updatedBilingual('community', $event)"
        :text="{
          is: '是否在双语城市或社区生活过？',
          explain: '例如乌鲁木齐市为维汉双语使用情况较多的城市。',
          which: '请选出该城市或社区使用哪2种语言',
          how: '你在双语城市或社区生活了多少年'
        }"
      ></bilingual>
    </section>
    <section v-show="step === 6">
      <h3>请根据说明对下列项目进行评分</h3>
      <score-table
        :languages="timeLanguages"
        @updated="updateScore"
      ></score-table>
    </section>
    <section v-show="step === 7">
      <h3 class="center">提交成功，非常感谢！</h3>
    </section>
    <div style="text-align: center;" v-if="step < 7">
      <transition name="fade">
        <Alert v-if="warning" type="warning" show-icon>
          {{warning}}
          <span slot="desc"></span>
        </Alert>
      </transition>
      <ButtonGroup shape="circle" size="large">
        <Button @click="prev" type="default" v-if="step > 1">
          <Icon type="chevron-left"></Icon>
          <span>上一步</span>
        </Button>
        <Button v-if="step < 6" @click="next" type="success">
          <span>下一步</span>
          <Icon type="chevron-right"></Icon>
        </Button>
        <Button v-else @click="submit" type="success"><span>提交</span></Button>
      </ButtonGroup>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import InfoForm from './InfoForm'
import LanguageSortable from './LanguageSortable'
import LanguageSelector from './LanguageSelector'
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
        nation: '',
        province: '',
        city: '',
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
        hearing: '听力障碍',
        language: '语言障碍',
        study: '学习障碍'
      },
      levelBarriers: {},
      timeAges: {},
      bilinguals: {
        school: {},
        home: {},
        community: {}
      },
      score: {},
      warning: '',
      slogonMonth: '11',
      slogonDay: '27'
    }
  },
  mounted: function () {
    if (window.document.body.clientWidth < 960) {
      console.log('mobile')
      window.requestAnimationFrame = () => {}
    }
  },
  computed: {
    results: function () {
      return {
        levelLanguages: this.levelLanguages,
        timeLanguages: this.timeLanguages,
        info: this.info,
        levelRates: this.levelRates,
        levelBarriers: this.levelBarriers,
        timeAges: this.timeAges,
        bilinguals: this.bilinguals,
        score: this.score
      }
    },
    showSlogon: function () {
      const now = new Date()
      const end = new Date((7 - now.getDay()) * 86400000 + now.getTime())
      this.slogonDay = end.getDate()
      this.slogonMonth = end.getMonth() + 1
      return this.step === 1 && (end.getFullYear()) < 2018
    }
  },
  methods: {
    next: function () {
      if (this.step === 1) {
        this.warning = this.validInfo()
      } else if (this.step === 2) {
        this.warning = this.validLanguages()
      } else if (this.step === 3) {
        this.warning = this.validPercent()
      } else if (this.step === 4) {
        this.warning = this.validNumber()
      } else if (this.step === 5) {
        this.warning = this.validBilingual()
      }
      if (!this.warning) {
        this.step = this.step + 1
        window.location.hash = ''
        window.location.hash = 'app'
        window.location.hash = ''
      }
    },
    prev: function () {
      this.warning = ''
      this.step = (this.step - 1) || 1
    },
    submit: function () {
      this.warning = this.validScore()
      if (!this.warning) {
        axios.post(process.env.SERVER_URL.LEAPQ, {
          data: this.results
        }).then(response => {
          this.step = 7
        })
      }
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
    updatedBilingual: function (name, bilingual) {
      this.bilinguals[name] = bilingual
    },
    validate: function (names, data, full) {
      return _.some(names, name => {
        const value = data[name]
        let isEmpty = false
        if (_.isDate(value)) {
          isEmpty = !(value > 0)
        } else if (_.isObject(value)) {
          isEmpty = full ? this.validateFull(value) : this.validateHave(value)
        } else {
          isEmpty = !value
        }
        if (isEmpty) {
          console.log(name)
        }
        return isEmpty
      })
    },
    validateHave: function (items) {
      return !_.some(items, item => item > 0)
    },
    validateFull: function (items) {
      return _.some(items, item => !item)
    },
    validInfo: function () {
      const invalid = this.validate([
        'lastname',
        'firstname',
        'birthday',
        'nation',
        'province',
        'city',
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
    },
    validLanguages: function () {
      if (this.languages.length < 3) {
        return '请至少选择你最擅长的 3 种语言'
      }
    },
    validPercent: function () {
      const invalid = this.validate([
        'first',
        'read',
        'speak',
        'write'
      ], this.levelRates)
      if (invalid) {
        return '请对所有情况的百分比进行选择'
      }
    },
    validNumber: function () {
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
    validBilingual: function () {
      const invalid = _.some(this.bilinguals, bilingual => {
        const isNot = !bilingual.isBilingual
        if (isNot) {
          return false
        } else {
          const languagesUnenough = bilingual.languages && (bilingual.languages.length !== 2)
          const unknownPeriod = !(bilingual.value > 0)
          return languagesUnenough || unknownPeriod
        }
      })

      if (invalid) {
        return '若存在双语环境，请完整填写2种语言及时间'
      }
    },
    validScore: function () {
      const levelValid = this.validate([
        'speak',
        'listen',
        'read'
      ], this.score.level, true)
      const impactValid = this.validate([
        'family',
        'friend',
        'school',
        'broadcast',
        'read',
        'tv',
        'network',
        'social'
      ], this.score.impact, true)

      const touchValid = this.validate([
        'family',
        'friend',
        'school',
        'broadcast',
        'read',
        'tv',
        'network',
        'social'
      ], this.score.touch, true)

      const oralValid = this.validate([
        'speak',
        'listen'
      ], this.score.oral, true)
      if (levelValid || impactValid || touchValid || oralValid) {
        return '请对所有条目进行评分'
      }
    }
  },
  components: {
    'info-form': InfoForm,
    'language-sortable': LanguageSortable,
    'language-selector': LanguageSelector,
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
  max-width: 840px;
  margin: auto;
  font-size: 16px;
}

h3 {
  font-weight: normal;
}

h3.center {
  font-size: 48px;
  color: #f38521;
  text-align: center;
  margin: 100px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.ivu-steps {
  padding: 20px 0;
}

.assert {
  margin-top: 20px;
}

@media (max-width: 960px) {
  section {
    padding: 4px 10px;
  }

  .slogon, .ivu-steps {
    padding: 10px 20px;
  }

  .ivu-form .ivu-form-item-label {
    display: block;
    float: none;
    width: 100%;
    text-align: left;
    padding-left: 12px;
  }

  .ivu-form-item-content {
    margin: 2px 20px!important;
  }

  .ivu-col-span-6,
  .ivu-col-span-9,
  .ivu-col-span-22 {
    width: 100%!important;
    margin-bottom: 10px;
  }

  .ivu-radio-inner {
      height: 20px;
      width: 20px;
  }

  .ivu-radio-inner:after {
    width: 12px;
    height: 12px;
    top: 3px;
    left: 3px;
  }

  .ivu-steps-content {
    display: none;
  }
}
</style>

