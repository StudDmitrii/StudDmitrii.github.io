<script setup>

import { RouterLink } from 'vue-router';

</script>

<template>
    <RouterLink to="/" class="home-butt"></RouterLink>
</template>

<style lang="scss" scoped>
$home: url(../assets/img/home.png);

.home-butt{
        background-color: rgb(221, 138, 82);
        border: 2px solid black;
        display: grid;
        grid-template-columns: auto 1fr;
        justify-items: center;
        align-items: center;

        &::before{
            width: 5vw;
            height: 5vh;
            content: '';
            background-image: $home;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

</style>