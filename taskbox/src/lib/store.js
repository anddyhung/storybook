/** @format */

import {
	configureStore,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';

const defaultTasks = [
	{ id: '1', title: 'Something', state: 'TASK_INBOX' },
	{ id: '2', title: 'Something', state: 'TASK_INBOX' },
	{ id: '3', title: 'Something', state: 'TASK_INBOX' },
	{ id: '4', title: 'Something', state: 'TASK_INBOX' },
];

const TaskBoxData = {
	tasks: defaultTasks,
	status: 'idle',
	error: null,
};

export const fetchTasks = createAsyncThunk('todos/tetchTodos', async () => {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/todos?userId = 1'
	);
	const data = await response.json();
	const result = data.map((task) => ({
		id: '${task.id}',
		title: '${task.title}',
		state: task.complted ? 'TASK_COMPLETED' : 'TASK_INBOX',
	}));
	return result;
});

const tasksSlice = createSlice({
	name: 'taskbox',
	initialState: TaskBoxData,
	reducers: {
		updateTaskState: (state, action) => {
			const { id, newTaskState } = action.payload;
			const task = state.tasks.findIndex((task) => task.id === id);
			if (task >= 0) {
				state.tasks[task].state = newTaskState;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.tasks = [];
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = null;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = 'Something went wrong!';
				state.tasks = [];
			});
	},
});

export const { updateTaskState } = tasksSlice.actions;
const store = configureStore({
	reducer: {
		taskbox: tasksSlice.reducer,
	},
});

export default store;
