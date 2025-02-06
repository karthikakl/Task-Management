import { db } from "../firebase/firebaseConfig";
import { collection,addDoc,updateDoc,doc,serverTimestamp,arrayUnion,query,where,getDocs } from "firebase/firestore";


const TASKS_COLLECTION = 'tasks'
const USERS_COLLECTION = 'users'

export const addTask = async(
  userId:string,
  taskName:string,
  category:string,
  description:string,
  fileUrl:string|null
)=>{
  try{
    const newTask ={
      userId,
      taskName:taskName,
      status:'pending',
      category,
      description,
      file: fileUrl || '',
      createdAt:serverTimestamp()
    }

    const taskRef = await addDoc(collection(db,TASKS_COLLECTION),newTask);
    const taskId=taskRef.id

    const userRef=doc(db,USERS_COLLECTION,userId)
    await updateDoc(userRef,{todo:arrayUnion(taskId)})

    return {id:taskId,...newTask}
  }catch(error){
    console.error('Error adding task:', error);
    throw error;
  }
}

export const editTask = async(
  taskId:string,
  updates:{
    taskName?:string;
    category?:string;
    description?:string;
    status?:string
    fileUrl?:string|null
  }
)=>{
  try {
    const taskRef = doc(db,'tasks',taskId);

    await updateDoc(taskRef,{
      ...updates,
      updatedAt:new Date()
    })
    console.log('Task updated successfully')
    return {id:taskId,...updates}
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, { status: 'deleted' });
    console.log("Task marked as deleted.");
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};



export const getDeletedTasks = async (userId: string) => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("userId", "==", userId),
      where("status", "==", "deleted")
    );

    const querySnapshot = await getDocs(q);
    const deletedTasks = querySnapshot.docs.map(doc => doc.data());
    return deletedTasks;
  } catch (error) {
    console.error("Error fetching deleted tasks:", error);
  }
};
