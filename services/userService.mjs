import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { checkAuthentication } from "./utilService.mjs";
import { db } from "./firebaseConfig.mjs";

//Login Register

const auth = getAuth();

const registerWithEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    createUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const loginWithEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};

//User

const userCollectionRef = collection(db, "usuario");

const createUser = async (req, res) => {
  const userId = req.locals.user.uid;

  try {
    const newUserRef = await addDoc(userCollectionRef, { id: userId });

    const newUserDoc = await getDoc(newUserRef);
    const newUserData = { ...newUserDoc.data(), id: newUserDoc.id };

    res.status(201).json(newUserData);

  } catch (error) {
    if (error === "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação") {
      res.status(401).json({ error: "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação" });
    } else {
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }
};



const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: 'O ID do usuário é obrigatório' });
  }

  try {
    const userDocRef = doc(userCollectionRef, userId);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = { ...userDocSnapshot.data(), id: userDocSnapshot.id };
      res.status(200).json(userData);
    } else {
      try {
        const newUserRef = await setDoc(doc(userCollectionRef, userId), { id: userId, imagem: `usuario/${userId}.png` });
        const newUserDoc = await getDoc(newUserRef);
        const newUserData = { ...newUserDoc.data(), id: newUserDoc.id };

        res.status(201).json(newUserData);


      } catch (error) {
        if (error === "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação") {
          res.status(401).json({ error: "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação" });
        } else {
          res.status(500).json({ error: "Erro do Servidor Interno" });
        }
      }
    }
  } catch (error) {
    console.error(error);
    if (error === "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação") {
      res.status(401).json({ error: "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação" });
    } else {
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  const userDocRef = doc(userCollectionRef, userId);

  try {

    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      await updateDoc(userDocRef, newData);
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    if (error === "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação") {
      res.status(401).json({ error: "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação" });
    } else {
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'O ID do usuário é obrigatório' });
  }

  const userDocRef = doc(userCollectionRef, userId);

  try {
    await checkAuthentication(req.locals.user, userId);
    await updateDoc(userDocRef, { excluir: true });

    res.status(204).send();
  } catch (error) {
    if (error === "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação") {
      res.status(401).json({ error: "Não autorizado - o ID do usuário do token não corresponde ao ID do usuário da solicitação" });
    } else {
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }
};

export { createUser, editUser, getUserById, deleteUser };
export { registerWithEmailAndPassword, loginWithEmailAndPassword };