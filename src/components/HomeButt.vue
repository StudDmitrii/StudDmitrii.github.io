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
            width: 40px;
            height: 40px;
            content: '';
            background-image: $home;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    @media screen and (max-width: 1000px){
        .home-butt{
            width: 40px;
            grid-template-columns: auto;
        }
    }

</style>