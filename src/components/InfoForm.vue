<template>
  <Form :model="info" :label-width="200">
    <FormItem label="姓名">
      <Row :gutter="16">
        <Col span="9">
          <Input v-model="info.lastname" placeholder="姓"></Input>
        </Col>
        <Col span="9">
          <Input v-model="info.firstname" placeholder="名"></Input>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="出生年月/年龄">
      <Row :gutter="16">
        <Col span="9">
          <DatePicker type="date" style="width:100%;" v-model="info.birthday" placeholder="出生年月"></DatePicker>
        </Col>
        <Col span="9">
          <InputNumber v-model="info.age" style="width:100%;" :min="10" :max="30"></InputNumber>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="性别">
      <Row :gutter="16">
        <Col span="22">
          <RadioGroup style="float: left;" v-model="info.gender">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="学校信息">
      <Row :gutter="16">
        <Col span="9">
          <Input v-model="info.university" placeholder="大学"></Input>
        </Col>
        <Col span="9">
          <Input v-model="info.college" placeholder="院系"></Input>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="班级信息">
      <Row :gutter="16">
        <Col span="9">
          <Input v-model="info.major" placeholder="专业和班级"></Input>
        </Col>
        <Col span="9">
          <Input v-model="info.studentnumber" placeholder="学号"></Input>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="联系方式">
      <Row :gutter="16">
        <Col span="6">
          <Input v-model="info.phone" placeholder="电话号码"></Input>
        </Col>
        <Col span="6">
          <Input v-model="info.qq" placeholder="QQ号"></Input>
        </Col>
        <Col span="6">
          <Input v-model="info.wechat" placeholder="微信号"></Input>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="学习/使用过的语言(最多5个)">
      <Select v-model="languages" multiple style="width:260px">
        <Option v-for="item in candiateLanguages" :value="item.id" :key="item.text">
          <span>{{ item.text }}</span>
        </Option>
      </Select>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'InfoForm',
  props: ['info', 'languages'],
  data: function () {
    return {
      candiateLanguages: [
        { id: 'chinese', text: '汉语' },
        { id: 'uyghur', text: '维吾尔语' },
        { id: 'kazakh', text: '哈萨克语' },
        { id: 'english', text: '英语' },
        { id: 'japanese', text: '日语' },
        { id: 'korean', text: '韩语/朝鲜语' },
        { id: 'french', text: '法语' },
        { id: 'german', text: '德语' },
        { id: 'russian', text: '俄语' },
        { id: 'spanish', text: '西班牙语' },
        { id: 'arabic', text: '阿拉伯语' },
        { id: 'portuguese', text: '葡萄牙语' },
        { id: 'other', text: '其他' }
      ]
    }
  },
  watch: {
    languages: function (selectedLang) {
      selectedLang.length = selectedLang.length > 5 ? 5 : selectedLang.length
    }
  }
}
</script>

<style>
.ivu-select-item {
  display: block;
}
</style>