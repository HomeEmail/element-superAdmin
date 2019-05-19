<template>
<div class="testPage">
	<h1>test</h1>
</div>
</template>

<script>
  
  export default {
    name: 'test1',
    created() {
      console.log('test1 created');
    },
    mounted() {
      console.log('test1 mounted');
    },
    activated() {
      console.log('test1 activated');
    },
    deactivated() {
      console.log('test1 deactivated');
    },
    destroyed() {
      console.log('test1 destroyed');
    },
    methods: {
    },
    watch: {
      '$route': function (to, from) {

      }
    }
  }
</script>

<style scoped>
.testPage{
  padding: 20px;
}
</style>