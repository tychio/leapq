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
        <Col span="18">
          <RadioGroup style="float: left;" v-model="info.gender">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </FormItem>

    <FormItem label="民族和籍贯">
      <Row :gutter="16">
        <Col span="6">
          <Input v-model="info.nation" placeholder="民族"></Input>
        </Col>
        <Col span="6">
          <Input v-model="info.province" placeholder="省份"></Input>
        </Col>
        <Col span="6">
          <Input v-model="info.city" placeholder="城市"></Input>
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
  </Form>
</template>

<script>
export default {
  name: 'InfoForm',
  props: ['info'],
  watch: {
    'info.birthday': function (birthday) {
      const today = (new Date()).setHours(0)
      const ageMS = today - birthday
      this.info.age = (new Date(ageMS)).getYear() - 70
    }
  }
}
</script>

<style>
.ivu-select-item {
  display: block;
}
</style>