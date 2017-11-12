<template>
  <div id="app">
    <header>
      <h1>语言经历和语言水平调查问卷 (Leap-Q)</h1>
    </header>
    <leapq/>
    <footer>
      <ul>
        <li><a href="http://www.vub.ac.be/" target="_blank">Vrije Universiteit Brussel</a></li>
      </ul>
      <p>改编自<strong>西北双语和心理语言研究实验室</strong></p>
      <p>玛丽安，布鲁莫菲尔德，及考山斯卡娅2007版的LEAP-Q</p>
      <p>改编者 吴蕊霖 布鲁塞尔自由大学</p>
    </footer>
  </div>
</template>

<script>
import LeapQ from './components/LeapQ'

export default {
  name: 'app',
  components: {
    leapq: LeapQ
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
