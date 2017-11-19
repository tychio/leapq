<template>
  <section>
    <h3>请在下拉列表中选择你所学习或使用过的语言（最多5个）</h3>
    <Select v-model="languages" multiple style="width:260px">
      <Option v-for="item in candiateLanguages" :value="item.id" :key="item.text">
        <span>{{ item.text }}</span>
      </Option>
    </Select>
  </section>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'LanguageSelector',
  props: ['selectedLanguages'],
  data: function () {
    return {
      candiateLanguages: [
        { id: 'chinese', text: '汉语' },
        { id: 'uyghur', text: '维吾尔语' },
        { id: 'english', text: '英语' },
        { id: 'kazakh', text: '哈萨克语' },
        { id: 'turkey', text: '土耳其语' },
        { id: 'japanese', text: '日语' },
        { id: 'korean', text: '韩语/朝鲜语' },
        { id: 'french', text: '法语' },
        { id: 'german', text: '德语' },
        { id: 'russian', text: '俄语' },
        { id: 'spanish', text: '西班牙语' },
        { id: 'arabic', text: '阿拉伯语' },
        { id: 'portuguese', text: '葡萄牙语' },
        { id: 'other', text: '其他' }
      ],
      languages: []
    }
  },
  watch: {
    languages: function (selectedLang) {
      selectedLang.length = selectedLang.length > 5 ? 5 : selectedLang.length
      const languagesObj = _.filter(this.candiateLanguages, lang => _.includes(selectedLang, lang.id))
      this.$emit('updated', languagesObj)
    }
  },
  mounted: function () {
    this.languages = _.map(this.selectedLanguages, lang => lang.id)
  }
}
</script>

<style>
</style>