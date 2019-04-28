<template>
<div class="testPage">
	<h1>test</h1>
</div>
</template>

<script>
  

  export default {
    name: 'test',
    methods: {
      handleExit(index, row) {
        console.log(index, row);
        this.$router.push('/Login')
      }
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