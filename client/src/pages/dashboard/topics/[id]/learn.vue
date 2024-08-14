<template>
    <!-- <div class="absolute top-0 right-0 left-0 h-[2px] bg-primary" :style="{
        width: `${progress}%`
    }"></div> -->
    <div class="container-app !py-4">
        <div class="md:max-w-3xl md:mx-auto">
            <Word v-if="currentGame === ELearnType.VOCA && learns[currentVocaToLearn]"
                :word="learns[currentVocaToLearn]" @learn-voca="handleLearnVoca" />
            <FillBlank v-if="currentGame === ELearnType.FILL_BLANK && currentVocaLeaning" :word="currentVocaLeaning"
                @play-game="handlePlayGame" />
            <ChooseWord v-if="currentGame === ELearnType.CHOOSE_WORD && currentVocaLeaning" :word="currentVocaLeaning"
                :learnings="learnings" :type="'word'" @play-game="handlePlayGame" />
            <ChooseWord v-if="currentGame === ELearnType.CHOOSE_MEANING && currentVocaLeaning"
                :word="currentVocaLeaning" :learnings="learnings" :type="'meaning'" @play-game="handlePlayGame" />
            <TrueOrFalse v-if="currentGame === ELearnType.TRUE_OR_FALSE && currentVocaLeaning" :learnings="learnings"
                :word="currentVocaLeaning" @play-game="handlePlayGame" />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    beforeRouteEnter: async (
        to: any,
        _from: any,
        next: any
    ) => {
        const topicId = to.params.id;

        const res = await queryClient.ensureQueryData(VocabularyClient.getPagingBuilderQueryOptions({
            filters: [
                `topic_id|${EFilterCondition.EQUAL}|${topicId}|${EFilterType.STRING}`
            ]
        }))

        if (res.items.length === 0) {
            return next({
                path: `/dashboard/topics/${topicId}`
            })
        }

        next()
    },
})</script>

<script setup lang="ts">
import { ChooseWord, FillBlank, TrueOrFalse, Word } from '@/components/games';
import { MAX_VOCA_PER_LEARN } from '@/constants';
import { VocabularyClient } from '@/hooks/vocabulary';
import { queryClient } from '@/libs/react-query';
import { EFilterCondition, EFilterType, } from '@/types/common';
import { ELearnType, type TLearnVoca } from '@/types/learn-voca';
import { getAppTitle } from '@/utils/common';
import { useTitle } from '@vueuse/core';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { definePage, useRoute, useRouter } from 'vue-router/auto';

/**
 * List voca user can learn and choose to learn
 */
const learns = ref<Array<TLearnVoca>>([])
/**
 * List voca user learning
 */
const learnings = ref<Array<TLearnVoca>>([])

const currentVocaToLearn = ref(0)
const currentVocaLeaning = ref<TLearnVoca | null>(null)
const currentGame = ref<ELearnType>(ELearnType.VOCA)


const { params } = useRoute('/dashboard/topics/[id]/');
const router = useRouter()

const { data } = VocabularyClient.usePagingBuilder({
    filters: [
        `topic_id|${EFilterCondition.EQUAL}|${params.id}|${EFilterType.STRING}`
    ],
})


const handleAutoGame = () => {
    const vocasStillLearning = learnings.value.filter(voca => voca.learning.length > 0)


    if (learnings.value.every(voca => voca.learning.length === 0)) {
        currentGame.value = ELearnType.VOCA
        return;
    }

    const randomIndexVoCa = Math.floor(Math.random() * vocasStillLearning.length)
    const randomIndexTypeLearning = Math.floor(Math.random() * vocasStillLearning[randomIndexVoCa].learning.length)

    const randomVoca = vocasStillLearning[randomIndexVoCa]
    const randomTypeLearning = randomVoca.learning[randomIndexTypeLearning]

    currentGame.value = randomTypeLearning

    // remove the type learning from learning list
    randomVoca.learning = randomVoca.learning.filter(v => v !== randomTypeLearning)

    // add the type learning to learned list
    randomVoca.learned.push(randomTypeLearning)

    currentVocaLeaning.value = randomVoca

    // update the voca in learnings
    learnings.value = learnings.value.map(voca => {
        if (voca.id === randomVoca.id) {
            return randomVoca
        }

        return voca
    })

}

const handleLearnVoca = async (
    { type, word_id }: {
        type: 'learn' | 'remembered',
        word_id: string
    }
) => {
    if (!word_id) return

    let vocaToLearn = learns.value.find(voca => voca.id === word_id)

    if (!vocaToLearn || learns.value.length === 0) return

    if (type === 'remembered') {
        vocaToLearn = {
            ...vocaToLearn,
            learned: Object.values(ELearnType),
            learning: []
        }
        learnings.value.push(vocaToLearn)
    } else {
        learnings.value.push(vocaToLearn)
    }


    currentVocaToLearn.value = currentVocaToLearn.value + 1

    const learningVocas = learnings.value.filter(voca => voca.learning.length > 0)


    if (learningVocas.length % MAX_VOCA_PER_LEARN === 0 ||
        learnings.value.length === learns.value.length
    ) {
        handleAutoGame()
    }
}

const handlePlayGame = (
    { type, gameType, wordId }: {
        type: 'correct' | 'incorrect',
        wordId: string,
        gameType: ELearnType
    }
) => {
    if (!wordId) return
    learnings.value = learnings.value.map(voca => {
        if (voca.id === wordId) {
            const _voca = {
                ...voca,
                percent: type === 'correct' ? voca.percent + 20 : voca.percent,
            }

            return _voca
        }

        return voca
    })

    handleAutoGame()
}


watch(data, (newData) => {
    learns.value = newData?.items.map(voca => {
        return {
            ...voca,
            learned: [],
            need_learn_again: [], // save the wrong answer
            learning: Object.values(ELearnType).filter(v => v !== ELearnType.VOCA),
            percent: 0
        }
    }) || []


}, { immediate: true })

watchEffect(async () => {
    const learnedVocas = learnings.value.filter(voca => voca.learning.length === 0)

    if (learnedVocas.length === data?.value?.items.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        router.push(`/dashboard/topics/${params.id}/result`)
    }
})

useTitle(
    getAppTitle(
        'Learn New Vocabularies'
    )
)


definePage({
    meta: {
        layout: 'User',
        roles: ['ADMIN', 'USER'],
        requiresAuth: true,
        noContainer: true,
        class: 'flex flex-col h-full !py-0 relative'
    },
})

</script>

<style scoped></style>