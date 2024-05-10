import { getAuth } from 'firebase/auth';
import { collection, getDocs, setDoc, query, where } from 'firebase/firestore';
import db from './firebaseConfig';


const [userInputData, setUserInputData]= useState([]);

export const fetchUserInput = async () => {
    const auth=getAuth();
    const user=auth.currentUser;
    const uid=user.uid;
    const data=[];

    const userDocRef = collection(db, 'users');
    const q = query(userDocRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const userDocSnap = querySnapshot.docs[0];
    const docPath = userDocSnap.ref.path;

    if (userDocSnap.exists()) {
      const userData= userDocSnap.data();
      if (userData['1'] && userData['1'].includes('Stress/Anxiety')){
        data.push("Stress/Anxiety");
      }
      if (userData['1'] && userData['1'].includes('ADHD')){
        data.push("ADHD");
      }
      if (userData['1'] && userData['1'].includes('Procrastination')){
        data.push("Procrastination");
      }
      if (userData['1'] && userData['1'].includes('Burnout')){
        data.push("Burnout");
      }
      if (userData['2'] && userData['2'].includes('Depressed')){
        data.push("depressed");
      }
      if (userData['2'] && userData['2'].includes('Anger')){
        data.push("anger");
      }
      if (userData['2'] && userData['2'].includes('Lonely')){
        data.push("lonely");
      }
      if (userData['3'] && userData['3'].includes('Excessive Worrying')){
        data.push("worrying");
      }
      if (userData['6'] && userData['6'].includes('Use alcohol or drugs to help me relax')){
        data.push("addiction");
      }
      if (userData['6'] && (userData['6'].includes('Self Harm') || userData['6'].includes('Comfort myself by eating') || userData['6'].includes('Detach myself from others') || userData['6'].includes('Sometimes i become physically violent') || userData['6'].includes('Go for a run or take a hot/cold shower') || userData['6'].includes('Others'))){
        data.push("ptsd");
      }
      if (userData['4'] && (userData['4'].includes('Lack of Motivation') || userData['4'].includes('Suicidal thoughts') || userData['4'].includes('Overthinking') || userData['4'].includes('Pressure from surroundings'))){
        data.push("ADHD2");
      }

    }
    setUserInputData(data);
    
  };
  
  export const addStories = async (userInputData) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
  
        const userDocRef = collection(db, 'users');
        const q = query(userDocRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDocSnap = querySnapshot.docs[0];
          const docPath = userDocSnap.ref.path;
  
          const userData = userDocSnap.data();
  
          if (!userData.forYouStories) {
            const forYouStoriesData = {};

            for (const userInput of userInputData) {
              let docRef;
              switch (userInput) {
                case 'Stress/Anxiety':
                  docRef = collection(db, 'Anxiety');
                  break;
                case 'ADHD':
                  docRef = collection(db, 'ADHD');
                  break;
                case 'Procrastination':
                  docRef = collection(db, 'procrastination');
                  break;
                case 'Burnout':
                  docRef = collection(db, 'burnout');
                  break;
                case 'lonely':
                  docRef = collection(db, 'lonely');
                  break;
                  case 'angry':
                    docRef = collection(db, 'angry');
                    break;  
                  case 'worrying':
                    docRef = collection(db, 'worrying');
                    break;  
                  case 'depressed':
                  docRef = collection(db, 'depression');
                  break;
                  case 'addiction':
                  docRef = collection(db, 'Addiction');
                  break;  
                  case 'ptsd':
                  docRef = collection(db, 'ptsd');
                  break;
                  case 'ADHD2':
                  docRef = collection(db, 'bipolar disorder');
                  break;
                default:
                  break;
              }
  
              const docsSnap = await getDocs(docRef);
              let index = 0;
              docsSnap.forEach(doc => {
                if (index < 2) {
                  forYouStoriesData[doc.id] = doc.data();
                  index++;
                }
              });
            }
  
            await setDoc(docPath, { ForYouStories: forYouStoriesData }, { merge: true });
          } else {
            console.log("ForYouStories already exists in the user document.");
          }
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error('Error adding stories:', error);
      }
  };


