export const games = [
    {
        id: 'game-add-1',
        label: 'たしざん（１）',
        requiresSelect: true,
        component: () => import('@/views/GameAdd1.vue'),
        routeName: 'GameAdd1'
    },
    {
        id: 'game-subtract-1',
        label: 'ひきざん（１）',
        requiresSelect: true,
        component: () => import('@/views/GameSubtract1.vue'),
        routeName: 'GameSubtract1'
    },
    {
        id: 'game-add-2',
        label: 'たしざん（２）',
        requiresSelect: true,
        component: () => import('@/views/GameAdd2.vue'),
        routeName: 'GameAdd2'
    },
    {
        id: 'game-karuta-reading',
        label: 'かるたよみあげ',
        requiresSelect: false,
        component: () => import('@/views/KarutaReading.vue'),
        routeName: 'GameKarutaReading'
    }
]
