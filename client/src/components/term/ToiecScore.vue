<template>
    <div class="score-cer md:text-base text-xs">
        <div class="max-w-4xl mx-auto w-full select-none">
            <div class="flex items-center justify-center">
                <div class="w-[10%]">
                </div>
                <div
                    class="w-[80%] bg-yellow-500 rounded-tl-[100%] rounded-tr-[100%] max-w-96 py-3 flex flex-col items-center text-center">
                    <span class="text-sm font-medium">
                        LISTENING AND READING
                    </span>
                    <span class="font-extrabold">
                        OFFICIAL SCORE CERTIFICATE
                    </span>
                </div>
                <div class="w-[10%]">
                </div>
            </div>
            <div class="border-2 border-yellow-500 py-2 md:py-4 flex">
                <div class="w-[15%] min-w-[100px] max-w-44 justify-center items-start md:flex hidden">
                    <img :src="userStore.currentUser?.avatar" class="w-20 h-20 rounded object-cover" />
                </div>

                <div class="w-1/2 md:block hidden">
                    <div class="row">
                        <div class="item">
                            <span class="item-title">
                                {{ userStore.currentUser?.name }}
                            </span>
                            <span class="item-note">
                                Name
                            </span>
                        </div>

                    </div>
                    <div class="row flex">
                        <div class="item">
                            <span class="item-title">
                                NINJA TOIEC 0210
                            </span>
                            <span class="item-note">
                                Identification <br />
                                Number
                            </span>
                        </div>
                        <div class="item">
                            <span class="item-title">
                                02/10/2002
                            </span>
                            <span class="item-note">
                                Date of Birth
                                <br />
                                (dd/mm/yyyy)
                            </span>
                        </div>

                    </div>
                    <div class="row flex">
                        <div class="item">
                            <span class="item-title">
                                08/10/2002
                            </span>
                            <span class="item-note">
                                Test Date
                                <br />
                                (dd/mm/yyyy)
                            </span>
                        </div>
                        <div class="item">
                            <span class="item-title">
                                08/10/2002
                            </span>
                            <span class="item-note">
                                Valid Until
                                <br />
                                (dd/mm/yyyy)
                            </span>
                        </div>

                    </div>
                </div>
                <div class="part md:border-l-2 !border-l-0">
                    <div class="row">
                        <span class="score-text">
                            LISTENING
                        </span>

                        <div class="score-number">
                            <div class="score-min">
                                0
                            </div>
                            <div class="score-line">
                                <div class="score-label" :style="{

                                    left: `${(score.listeningScore * 100 / MAX_SCORE)}%`
                                }">
                                    {{ score.listeningScore }}
                                </div>
                            </div>
                            <div class="score-max">
                                {{ MAX_SCORE }}
                            </div>
                        </div>
                    </div>
                    <div class="row !border-none">
                        <div class="score-text">
                            READING
                        </div>

                        <div class="score-number">
                            <div class="score-min">
                                0
                            </div>
                            <div class="score-line">
                                <div class="score-label" :style="{

                                    left: `${(score.readingScore * 100 / MAX_SCORE)}%`
                                }">
                                    {{
                                        score.readingScore
                                    }}
                                </div>
                            </div>
                            <div class="score-max">
                                {{ MAX_SCORE }}
                            </div>
                        </div>
                    </div>

                </div>
                <div class="w-32 score px-2 flex flex-col gap-4 items-center">
                    <span class="score-text">
                        TOTAL SCORE
                    </span>
                    <span
                        class="w-16 h-16 rounded-full border-[3px] border-stone-700 flex items-center justify-center font-bold">
                        {{ score.totalScore }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MAX_SCORE } from '@/constants';
import { useCurrentUserStore } from '@/stores/current-user';
import type { TChoice } from '@/types/common';
import { calcScore } from '@/utils/calc-score';
import { computed } from 'vue';

type Props = {
    choices: TChoice[]
}


const props = defineProps<Props>()

const userStore = useCurrentUserStore()

const score = computed(() => {
    return calcScore(props.choices)
})

</script>

<style scoped>
.part {
    @apply border-x-2 border-stone-700 md:w-1/2 w-full md:p-0 px-2
}

.part .row {
    @apply border-b-2 border-stone-700 pb-5 flex flex-col h-[116px]
}

.row {
    @apply mb-5
}

.item {
    @apply border-l-2 border-stone-700 relative flex-col flex w-full;
}

.item::before {
    content: "";
    @apply w-14 border-b-2 border-stone-700 absolute;
    left: -2px;
    bottom: -2px
}

.item-title {
    @apply border-b-2 border-stone-700 py-1 px-2 font-medium;
}

.item-note {
    @apply py-1 px-2 text-sm;
}

.score-text {
    @apply font-extrabold py-1 px-2 flex items-center justify-center text-center mb-5 bg-yellow-500 max-w-max mx-auto;
}


.score-number {
    @apply flex items-center relative mt-auto;
}

.score-line {
    background: linear-gradient(90deg, #c7c7c7, #535151);
    height: 18px;
    width: 100%;
    position: relative
}

.score-label {
    @apply w-8 h-5 border-2 border-stone-700 rounded-full absolute bg-white text-xs flex items-center justify-center;
    bottom: calc(100% + 5px);
}

.score-label::before {
    content: "";
    display: inline-block;
    border-top: 7px solid #333;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    bottom: -7px;
    left: calc(50% - 6px);
}

.score-min {
    @apply w-8 flex items-start justify-center flex-shrink-0 font-medium
}

.score-max {
    @apply w-8 flex items-end justify-center flex-shrink-0 font-medium
}
</style>