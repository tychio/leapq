<template>
  <div id="app">
    <header>
      <h1 v-if="!page">语言经历和语言水平调查问卷 (Leap-Q)</h1>
      <h1 v-else>实验数据分析</h1>
    </header>
    <analysis v-if="page === 'analysis'"/>
    <result v-else-if="page === 'result'"/>
    <leapq v-else/>
    <footer>
      <p>改编自<strong>西北双语和心理语言研究实验室</strong></p>
      <p>玛丽安，布鲁莫菲尔德，及考山斯卡娅2007版的LEAP-Q</p>
      <ul>
        <li><a href="http://www.vub.ac.be/" target="_blank">Vrije Universiteit Brussel</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import LeapQ from './components/LeapQ'
import Analysis from './components/Analysis'
import Result from './components/Result'

export default {
  name: 'app',
  data: function () {
    return {
      page: null
    }
  },
  components: {
    leapq: LeapQ,
    analysis: Analysis,
    result: Result
  },
  mounted: function () {
    const params = window.location.search.match(/(p=)([\w]+)/)
    if (params && params.length >= 3) {
      this.page = params[2]
    } else {
      window.onbeforeunload = function (e) {
        const message = '是否确认关闭当前窗口？'
        e = e || window.event
        // For IE and Firefox
        if (e) {
          e.returnValue = message
        }
        // For Safari
        return message
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

header, footer {
  text-align: center;
  font-weight: normal;
  padding: 20px 0;
}

header {
  border-bottom: 1px solid #888;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
