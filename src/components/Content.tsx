import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Content.module.css'
import clipboard from '../assets/clipboard.svg'
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Trash } from '@phosphor-icons/react'
import { v4 as uuidv4 } from 'uuid'

 interface ContentProps {
   id: string,
   title: string,
   isCompleted: boolean,
  }

export function Content(){
  // Define os estados atuais dos componentes
  const [tasks, setTasks] = useState<ContentProps[]>([]) // Armazena as tarefas na lista
  const [newTask, setNewTask] = useState('') // Armazena a nova tarefa a ser adicionada

  const taskLength = tasks.length

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (newTask !== '') {
      const task = { 
        id: uuidv4(), // Gera um ID único para a tarefa
        title: newTask,
        isCompleted: false 
      }
      setTasks([...tasks, task]) // Adiciona a nova tarefa ao estado 'tasks'
      setNewTask('') // Limpa o campo do input
    } else {
      alert('Favor adicionar uma tarefa no campo.')
    }
  } 
  // Função para atualizar o valor do campo de nova tarefa
  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
     }

  function handleDeleteTask(tasksToDelete:string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== tasksToDelete
    })
    console.log(tasksWithoutDeletedOne);
    setTasks(tasksWithoutDeletedOne)
  }
  return (
    <section className={styles.content}>
      <form onSubmit={handleCreateNewTask} className={styles.wrapperInput}>
        <input
          className={styles.input}
          placeholder='Adicione uma tarefa'
          type="text"
          name="comment"
          onChange={handleNewTask}
          value={newTask}
        />
        <button>
          Criar <AiOutlinePlusCircle size='20' />
        </button>
      </form>

      <div className={styles.info}>
        <p>Tarefas criadas <span>{taskLength}</span></p>
        <p>Concluídas <span>{tasks.filter(task => task.isCompleted).length} de {taskLength} </span></p>
      </div>

      {tasks.length > 0 ? (
        <div className={styles.list}>
          {tasks.map(task => (
            <ul key={task.id}>
              <li>
                <input
                  id={task.id}
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => {
                    const updatedTasks = tasks.map(t => {
                      if (t.id === task.id) {
                        t.isCompleted = !t.isCompleted;
                      }
                      return t;
                    });
                    setTasks(updatedTasks);
                  }}
                />
                <label 
                  htmlFor={task.id}
                  className={task.isCompleted ? styles.listCheck : styles.uncheckedList}>
                  {task.title}
                </label>

                <button onClick={() => handleDeleteTask(task.id)}>
                  <Trash size={19} />
                </button>
              </li>
            </ul>
          ))}
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
