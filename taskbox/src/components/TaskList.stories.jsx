import TaskList from "./TaskList";
import * as TaskStories from './Task.stories';
export default {
    component: TaskList,
    title: 'TaskList',
    decorators: [(story) => <div style = {{padding: '3rem'}}>{story()}</div> ],
    tags: ['autodocs'],
};
export const Default = {
    args:{
        tasks:[
           { ...TaskStories.Default.args.task, id:'1', title: 'task 1',},
           {...TaskStories.Default.args.task, id:'2', title: 'task 2',},
           {...TaskStories.Default.args.task, id:'3', title: 'task 3',},
           {...TaskStories.Default.args.task, id:'4', title: 'task 4',},
           {...TaskStories.Default.args.task, id:'5', title: 'task 5',},
           {...TaskStories.Default.args.task, id:'6', title: 'task 6',},
        ],
    },
};

export const WithPinnedTasks = {
    args:{
        tasks:[
            ...Default.args.tasks.slice(0,5),
            {id: '6', title: 'task 6(achieved)', state: 'TASK_ARCHIVED',},
        ],
    },
};

export const Loading = {
    args:{
        tasks:[],
        loading: true,
    },
};

export const Empty = {
    args:{
        ...Loading.args,
        loading: false,
    },
};