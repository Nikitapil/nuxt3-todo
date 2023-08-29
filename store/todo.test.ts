import {createPinia, setActivePinia} from 'pinia'
import {Todo, useTodoStore} from "./todo";

describe('todo tests', () => {
    beforeAll(() => {
        setActivePinia(createPinia())
    })

    describe('useTodoStore', () => {
        let store: ReturnType<typeof useTodoStore>;

        beforeEach(() => {
            store = useTodoStore()
        })

        afterEach(() => store.$reset())

        test('creates a store', () => {
            expect(store).toBeDefined()
        })

        test('initializes with empty items', () => {
            expect(store.items).toEqual([])
        })

        test('creates a todo', () => {
            store.add({title: 'Test my code!'});
            expect(store.items.length).toBe(1)
            expect(store.items[0].title).toBe( 'Test my code!')
        })

        test('gets by id', () => {
            store.add({title: 'Test my code!'});
            const item = store.items[0];

            const todo = store.getById(item.id);

            expect(todo).toEqual(item)
        })

        test('get ordered todos withou mutating state', () => {
            const items = [
                {
                    createdAt: new Date(2021, 2, 14)
                },
                {
                    createdAt: new Date(2019, 2, 14)
                },
                {
                    createdAt: new Date(2020, 2, 14)
                }
            ]

            store.items = items as Todo[]

            const orderedTodos = store.getOrderedTodos

            expect(orderedTodos).toStrictEqual([
                {
                    createdAt: new Date(2019, 2, 14)
                },
                {
                    createdAt: new Date(2020, 2, 14)
                },
                {
                    createdAt: new Date(2021, 2, 14)
                },
            ])

            expect(store.items[0]).toEqual({
                createdAt: new Date(2021, 2, 14)
            })
        })

        test('remove a todo', () => {
            store.add({title: 'Test my code!'});

            const id = store.items[0].id

            store.remove(id)

            expect(store.items.length).toBe(0)
        })

        test('update a todo', () => {
            store.add({title: 'Test my code!'});
            store.add({title: 'Test my code!'});

            const todo = store.items[0]

            store.update(todo.id, {title: 'Updated!', done: true})

            expect(store.items[0].title).toBe('Updated!')
            expect(store.items[0].done).toBe(true)

            expect(store.items[1].title).toBe('Test my code!')
            expect(store.items[1].done).toBe(false)
        })
    })
})