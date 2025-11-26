<template>
    <RouterView></RouterView>
</template>
<script setup>

</script>

<style>
/* 公共样式 */

/* 撑开整个页面 */
body,html,#app{
    width: 100%;
    height: 100%;
    background-color: gainsboro;
}

/* 调整router-link样式 */ 
a {
  text-decoration: none;
}
</style>