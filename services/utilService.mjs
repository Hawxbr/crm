import { db } from "./firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore"; 

const checkAuthentication = async (user, userId) => {
    const authenticatedUser = user;
    if (authenticatedUser && authenticatedUser.uid == userId) {
        return true;
    } else {
     throw 'Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação';
    }
};

const getMarcaById = async (marcaId) => {
    const marcaDocRef = doc(db, "marca", marcaId);
    try {
      const marcaDocSnapshot = await getDoc(marcaDocRef);
      if (marcaDocSnapshot.exists()) {
        return { id: marcaDocSnapshot.id, ...marcaDocSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar marca:", error);
      return null;
    }
  };
  
  const getColecaoById = async (colecaoId) => {
    const colecaoDocRef = doc(db, "colecao", colecaoId);
    try {
      const colecaoDocSnapshot = await getDoc(colecaoDocRef);
      if (colecaoDocSnapshot.exists()) {
        return { id: colecaoDocSnapshot.id, ...colecaoDocSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      return null;
    }
  };
  
  const getClienteById = async (clienteId) => {
    const clienteDocRef = doc(db, "cliente", clienteId);
    try {
      const clienteDocSnapshot = await getDoc(clienteDocRef);
      if (clienteDocSnapshot.exists()) {
        return { id: clienteDocSnapshot.id, ...clienteDocSnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return null;
    }
  };

export { checkAuthentication, getMarcaById, getColecaoById, getClienteById };
