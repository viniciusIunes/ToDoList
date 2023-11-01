import { useState } from 'react'
import styles from './Content.module.css'
import clipboard from '../assets/clipboard.svg'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Trash } from '@phosphor-icons/react'
import {v4 as uuidv4} from 'uuid';

  interface ContentProps {
    id: string,
    text: string,
    checked: false,
  }


 export function Content({id, text, checked}:ContentProps) {
  // export function Content() {
  const [task, setTask] = useState<ContentProps[]>([
    {
      id: uuidv4(),
      text:event.target.value,
      checked: false
    },
    {
      id: uuidv4(),
      text:event.target.value,
      checked: false
    }
  ])
  const [newTask, setNewTask] = useState('')

  function handleCreateNewList() {
      event.preventDefault()
      setTask([...task, newTask])
      setNewTask('')
  }

  function handleNewTask() {
    setNewTask(event.target.value)
  }

  const handleTaskCheck = (taskId: number) =>  {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTask(updatedTasks);
};

  return (
    <section className={styles.content}>

      <form onSubmit={handleCreateNewList} className={styles.wrapperInput}>
        <input
          className={styles.input}
          placeholder = 'Adicione uma tarefa'
          type="text"
          onChange={handleNewTask}
          value={newTask}
        />
        <button>
          Criar  <AiOutlinePlusCircle size = '20' />
        </button>
      </form>

      <div className={styles.info}>
        <p>Tarefas criadas <span>0</span></p>
        <p>Concluídas <span>0</span></p>
      </div>


      {task.length > 0 ? (
        <div className={styles.list}>
          {task.map(tasks => {
            return (
                <ul>
                  <li key={task.id}>
                      <input
                        id='checkbox'
                        type="checkbox"
                        value={task.text}
                        checked={task.checked}
                        onChange={() => handleTaskCheck(id)}
                      />
                      <label className={checked? styles.listCheck : styles.uncheckedList}
                        htmlFor = 'checkbox' >
                        {tasks.text}
                      </label>

                      <div>
                        <Trash size={19} />
                      </div>
                  </li>
                </ul>
            )
          })}
        </div>
      ) : (
        <div className={styles.noTask}>
          <span></span>
          <img src={clipboard} alt="image of clipboard" />
          <p className={styles.firstParagraph}>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      )}
    </section>
  )
}