<template>
	<h1>test</h1>
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

</style>