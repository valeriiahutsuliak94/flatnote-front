export const addNote = note => {
    return {
      type: 'ADD_NOTE',
      noteInfo: {
        id: note.id,
        title: note.title,
        content: note.content,
        tags: [],
        userId: note.userId
      }
    }
  }
  
  export const showNote = note => {
    return {
    type: 'SHOW_NOTE',
    id: note.id
    }
  }
  
  export const deleteNote = note => {
    return {
      type: 'DELETE_NOTE',
      id: note.id
    }
  }
  
  export const showEdit = note => {
    return {
      type: 'SHOW_EDIT',
      id: note.id
    }
  }
  
  export const editNote = note => {
    return {
      type: 'EDIT_NOTE',
      note
    }
  }