//StoryPage.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, ImageBackground,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { getFirestore, collection, getDocs, getDoc, setDoc, query, where, addDoc} from 'firebase/firestore';
import db from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const images = [
  require('./assets/storyimages/imgs1.jpg'),
  require('./assets/storyimages/imgs2.jpg'),
  require('./assets/storyimages/imgs3.jpg'),
  require('./assets/storyimages/imgs4.jpg'),
  require('./assets/storyimages/imgs5.jpg'),
  require('./assets/storyimages/imgs6.jpg'),
  require('./assets/storyimages/imgs7.jpg'),
  require('./assets/storyimages/imgs8.jpg'),
  require('./assets/storyimages/imgs9.jpg'),
  require('./assets/storyimages/imgs10.jpg'),
  require('./assets/storyimages/imgs11.jpg'),
  require('./assets/storyimages/imgs12.jpg'),
  require('./assets/storyimages/imgs0.jpg'),
];



const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAngerStories = async () => {
  const coll = collection(db, 'anger');
  let angerStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      angerStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return angerStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};


const getBurnoutStories = async () => {
  const coll = collection(db, 'burnout');
  let burnoutStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      burnoutStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return burnoutStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getDepressionStories = async () => {
  const coll = collection(db, 'depression');
  let depressionStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      depressionStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return depressionStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getLonelyStories = async () => {
  const coll = collection(db, 'lonely');
  let lonelinessStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      lonelinessStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return lonelinessStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getForYouStories = async () => {

  const auth=getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const userDocRef = collection(db, 'users');
  const q = query(userDocRef, where('uid', '==', uid));

  const querySnapshot = await getDocs(q);

  const userDocSnap = querySnapshot.docs[0];

  const coll = collection(db,userDocSnap.ref.path, 'ForYouStories');
  let forYouStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      forYouStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return forYouStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getProcrastinationStories = async () => {
  const coll = collection(db, 'procrastination');
  let procrastinationStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      procrastinationStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return procrastinationStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getWorryingStories = async () => {
  const coll = collection(db, 'worrying');
  let worryingStories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size;

    for(let i = 0; i < count; i++) {
      const randomImgIndex = getRandomInt(0, images.length - 1);
      worryingStories.push({ index: i, image: images[randomImgIndex] });
    }
  
    return worryingStories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getFeaturedStories = async () => {
  const coll = collection(db, 'featured stories');
  let featuredstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        featuredstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(featuredstories);
  
    return featuredstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getAddictionStories = async () => {
  const coll = collection(db, 'Addiction');
  let addictionstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        addictionstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(addictionstories);
  
    return addictionstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getAnxietyStories = async () => {
  const coll = collection(db, 'Anxiety');
  let anxietystories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; 

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        anxietystories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(anxietystories);
  
    return anxietystories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getADHDStories = async () => {
  const coll = collection(db, 'ADHD');
  let ADHDstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        ADHDstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(ADHDstories);
  
    return ADHDstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getptsdStories = async () => {
  const coll = collection(db, 'ptsd');
  let ptsdstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        ptsdstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(ptsdstories);
  
    return ptsdstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getPersonalStories = async () => {
  const coll = collection(db, 'Personal Stories');
  let personalstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        personalstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(personalstories);
  
    return personalstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getbipolarStories = async () => {
  const coll = collection(db, 'bipolar disorder');
  let bipolarstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        bipolarstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(bipolarstories);
  
    return bipolarstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const geteatingStories = async () => {
  const coll = collection(db, 'eating disorders');
  let eatingstories = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        eatingstories.push({ index: i, image: images[randomImgIndex] });
      };
      console.log(eatingstories);
  
    return eatingstories;
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return []; // Return 0 in case of error
  }
};

const getLearnMore = async () => {
  const coll = collection(db, "Learn More: ");
  let LearnMore = [];
 
  try {
    const snapshot = await getDocs(coll);
    const count = snapshot.size; // Get the count of documents

    for(let i=0;i<count;i++){
 
        const randomImgIndex = getRandomInt(0, (images.length) - 1);
        LearnMore.push({ index: i, image: images[randomImgIndex] });
      };

      console.log(LearnMore)
  
    return LearnMore;
  } catch (error) {
    console.error('Error fetching documents:', error);
    console.log(error);
    return []; // Return 0 in case of error
  }
};


  const StoryPage = () => {

    const navigation = useNavigation(); // Initialize navigation

  const [featuredStoryData, setFeaturedStoryData] = useState([]);
  const [featuredStories, setfeaturedStories ] = useState([]);
  const [LearnMoreData, setLearnMoreData] = useState([]);
  const [LearnMore, setLearnMore ] = useState([]);
  const [addictionData, setAddictionData] = useState([]);
  const [addictionStories, setAddictionStories] = useState([]);
  const [anxietyData, setAnxietyData] = useState([]);
  const [anxietyStories, setAnxietyStories] = useState([]);
  const [personalstoriesData, setPersonalstoriesData] = useState([]);
  const [personalStories, setPersonalStories] = useState([]);
  const [bipolarData, setbipolarData] = useState([]);
  const [bipolarStories, setbipolarStories] = useState([]);
  const [eatingData, seteatingData] = useState([]);
  const [eatingStories, seteatingStories] = useState([]);
  const [ptsdData, setptsdData] = useState([]);
  const [ptsdStories, setptsdStories] = useState([]);
  const [ADHDData, setADHDData] = useState([]);
  const [ADHDStories, setADHDStories] = useState([]);

  const [lonelyData, setLonelyData] = useState([]);
  const [lonelyStories, setLonelyStories] = useState([]);

  const [procrastinationData, setProcrastinationData] = useState([]);
  const [procrastinationStories, setProcrastinationStories] = useState([]);

  const [worryingData, setWorryingData] = useState([]);
  const [worryingStories, setWorryingStories] = useState([]);

  const [burnoutData, setBurnoutData] = useState([]);
  const [burnoutStories, setBurnoutStories] = useState([]);

  const [angerData, setAngerData] = useState([]);
  const [angerStories, setAngerStories] = useState([]);

  const [depressedData, setDepressedData] = useState([]);
  const [depressedStories,setDepressedStories]= useState([]);

  const [forYouData, setForYouData] = useState([]);
  const [forYouStories,setForYouStories]= useState([]);

  const [userInputData, setUserInputData]= useState([]);

  useEffect(() => {
    const fetchUserInput= async()=> {
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
      console.log(docPath)
      console.log("doc path exists")
      const userData= userDocSnap.data();
      if (userData['1'] && userData['1'].includes('Stress/Anxiety')){
        data.push("Anxiety");
      }
      if (userData['1'] && userData['1'].includes('ADHD')){
        data.push("ADHD");
      }
      if (userData['1'] && userData['1'].includes('Procrastination')){
        data.push("Procrastination");
      }
      if (userData['1'] && userData['1'].includes('Burnout')){
        console.log("working")
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

    }else{
      console.log("path doesnt exist")
    }    
    setUserInputData(data);
  };
  fetchUserInput();
  },[])

console.log(userInputData,"511")

useEffect(() => {
    const addStories = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      console.log(userInputData)  
      const userDocRef = collection(db, 'users');

      const q = query(userDocRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      const userDocSnap = querySnapshot.docs[0];
      const docPath = userDocSnap.ref.path;
      const userData = userDocSnap.data();
      const forYouStoriesRef = collection(db,docPath,'ForYouStories');
      const forYouStoriesSnapshot = await getDocs(forYouStoriesRef);

    
      try {
        if (forYouStoriesSnapshot.empty) {
            console.log(userData);
            const forYouStoriesData = {};
            for (const userInput of userInputData) {
              let docRef;
              switch (userInput) {
                case 'Anxiety':
                  docRef = collection(db, 'Anxiety');
                  break;
                case 'ADHD':
                  docRef = collection(db, 'ADHD');
                  break;
                case 'Procrastination':
                  docRef = collection(db, 'Procrastination');
                  break;
                case 'Burnout':
                  docRef = collection(db, 'Burnout');
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
            const forYouStoriesCollectionRef = collection(db, docPath, 'ForYouStories');

            try {
              for (const docId in forYouStoriesData) {
                await addDoc(forYouStoriesCollectionRef, forYouStoriesData[docId]);
              }
            } catch (error) {
              console.error('Error adding stories:', error);
            }

          } else {
            console.log("ForYouStories already exists in the user document.");
          }
      } catch (error) {
        console.log("docPath:",docPath)
        console.error('Error adding stories:', error);
      }
    };
    addStories();
  }, [userInputData]);

useEffect(() => {
  const fetchDepressedStories = async () => {
    const data = await getDepressionStories();
    setDepressedStories(data);
  };
  
  fetchDepressedStories();
}, []);

useEffect(() => {
  const fetchForYouStories = async () => {
    const data = await getForYouStories();
    setForYouStories(data);
  };
  
  fetchForYouStories();
}, []);


  useEffect(() => {
    const fetchAngerStories = async () => {
      const data = await getAngerStories();
      setAngerStories(data);
    };
    
    fetchAngerStories();
  }, []);

  useEffect(() => {
    const fetchBurnoutStories = async () => {
      const data = await getBurnoutStories();
      setBurnoutStories(data);
    };
    
    fetchBurnoutStories();
  }, []);

  useEffect(() => {
    const fetchLonelyStories = async () => {
      const data = await getLonelyStories();
      setLonelyStories(data);
    };
    
    fetchLonelyStories();
  }, []);

  useEffect(() => {
    const fetchProcrastinationStories = async () => {
      const data = await getProcrastinationStories();
      setProcrastinationStories(data);
    };
    
    fetchProcrastinationStories();
  }, []);

  useEffect(() => {
    const fetchWorryingStories = async () => {
      const data = await getWorryingStories();
      setWorryingStories(data);
    };
    
    fetchWorryingStories();
  }, []);

  useEffect(() => {
  const fetchFeaturedStories = async () => {
    const data = await getFeaturedStories();
    setfeaturedStories(data);
  };

  fetchFeaturedStories();
  }, []);

  useEffect(() => {
    const fetchAddictionStories = async () => {
      const data = await getAddictionStories();
      setAddictionStories(data);
    };
  
    fetchAddictionStories();
  }, []);

  useEffect(() => {
    const fetchAnxietyStories = async () => {
      const data = await getAnxietyStories();
      setAnxietyStories(data);
    };
  
    fetchAnxietyStories();
  }, []);

  useEffect(() => {
    const fetchADHDStories = async () => {
      const data = await getADHDStories();
      setADHDStories(data);
    };
  
    fetchADHDStories();
  }, []);

  useEffect(() => {
    const fetchbipolarStories = async () => {
      const data = await getbipolarStories();
      setbipolarStories(data);
    };
  
    fetchbipolarStories();
  }, []);

  useEffect(() => {
    const fetcheatingStories = async () => {
      const data = await geteatingStories();
      seteatingStories(data);
    };
  
    fetcheatingStories();
  }, []);

  useEffect(() => {
    const fetchptsdStories = async () => {
      const data = await getptsdStories();
      setptsdStories(data);
    };
  
    fetchptsdStories();
  }, []);


  useEffect(() => {
    const fetchPersonalStories = async () => {
      const data = await getPersonalStories();
      setPersonalStories(data);
    };
  
    fetchPersonalStories();
  }, []);
  

  useEffect(() => {
    const fetchLearnMore = async () => {
      const data = await getLearnMore();
      setLearnMore(data);
    };
  
    fetchLearnMore();
    }, []);


    useEffect(() => {
      const fetchLonelyStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'lonely')); // Fetch data from the "Anger" collection
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data()); // Push the data of each document in the collection to the data array
        });
        setLonelyData(data); // Set the fetched data to the state variable for Anger stories
      };
    
      fetchLonelyStoriesData(); // Call the fetch function
    }, []);

    useEffect(() => {
      const fetchAngerStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'anger')); // Fetch data from the "Anger" collection
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data()); // Push the data of each document in the collection to the data array
        });
        setAngerData(data); // Set the fetched data to the state variable for Anger stories
      };
    
      fetchAngerStoriesData(); // Call the fetch function
    }, []);

    useEffect(() => {
      const fetchDepressedStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'depression')); // Fetch data from the "Anger" collection
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data()); // Push the data of each document in the collection to the data array
        });
        setDepressedData(data); // Set the fetched data to the state variable for Anger stories
      };
    
      fetchDepressedStoriesData(); // Call the fetch function
    }, []);

    useEffect(() => {
      const fetchForYouStoriesData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        const userDocRef = collection(db, 'users');
        const q = query(userDocRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const userDocSnap = querySnapshot.docs[0];
        
        if (userDocSnap.exists()) {
          const docPath=userDocSnap.ref.path;
          const forYouStoriesRef=collection(db,docPath,'ForYouStories');
          const forYouStoriesSnapshot=await getDocs(forYouStoriesRef);
          if (!forYouStoriesSnapshot.empty) {
            const data = [];
            forYouStoriesSnapshot.forEach((doc) => {
              data.push(doc.data());
            });
            console.log(data);
            setForYouData(data);
          } else {
            console.log('ForYouStories collection does not exist in the user document.');
          }
        } else {
          console.error('User document does not exist.');
        }
      };
    
      fetchForYouStoriesData(); 
    }, []);
    console.log(forYouData,"here")

    useEffect(() => {
      const fetchProcrastinationStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'procrastination'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setProcrastinationData(data);
      };
    
      fetchProcrastinationStoriesData();
    }, []);
    
    useEffect(() => {
      const fetchWorryingStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'worrying'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setWorryingData(data);
      };
    
      fetchWorryingStoriesData();
    }, []);
    
    useEffect(() => {
      const fetchBurnoutStoriesData = async () => {
        const querySnapshot = await getDocs(collection(db, 'burnout'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setBurnoutData(data);
      };
    
      fetchBurnoutStoriesData();
    }, []);

  useEffect(() => {
    const fetchFeaturedStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'featured stories'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setFeaturedStoryData(data);
    };

    fetchFeaturedStoriesData();
  }, []);

  useEffect(() => {
    const fetchLearnMoreData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Learn More: '));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setLearnMoreData(data);
    };

    fetchLearnMoreData();
  }, []);

  useEffect(() => {
    const fetchADHDStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'ADHD'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setADHDData(data);
    };

    fetchADHDStoriesData();
  }, []);

  useEffect(() => {
    const fetchAddictionStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Addiction'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAddictionData(data);
    };

    fetchAddictionStoriesData();
  }, []);

  useEffect(() => {
    const fetchAnxietyStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Anxiety'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAnxietyData(data);
    };

    fetchAnxietyStoriesData();
  }, []);

  useEffect(() => {
    const fetchptsdStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'ptsd'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setptsdData(data);
    };

    fetchptsdStoriesData();
  }, []);

  useEffect(() => {
    const fetchPersonalStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Personal Stories'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setPersonalstoriesData(data);
    };

    fetchPersonalStoriesData();
  }, []);

  useEffect(() => {
    const fetchbipolarStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'bipolar disorder'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setbipolarData(data);
    };

    fetchbipolarStoriesData();
  }, []);

  useEffect(() => {
    const fetcheatingStoriesData = async () => {
      const querySnapshot = await getDocs(collection(db, 'eating disorders'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      seteatingData(data);
    };

    fetcheatingStoriesData();
  }, []);



  return (
    <LinearGradient colors={['rgba(58, 131, 244,0.4)', 'rgba(9, 181, 211, 0.4)']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, padding: 16 }}>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCategory(category)}
                  style={{
                    padding: 10,
                    marginRight: 10,
                    backgroundColor: activeCategory === category ? 'lightblue' : 'lightgray',
                    borderRadius: 10,
                    width: 100,
                    height: 40,
                  }}
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView> */}
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={{marginTop:20, fontSize: 30, fontWeight: 'bold', color: '#330066',textDecorationLine:'underline' }}>
                Learn More
              </Text>
            </View>
            {/* Horizontal ScrollView for featuredStories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {LearnMore.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: LearnMoreData[story.index]?.Title, 
                    content: LearnMoreData[story.index]?.Story, 
                    image: story.image,
                    link: LearnMoreData[story.index]?.Link
                  })}
                  
                  /* Add your navigation logic here */
                >
                  <ImageBackground
                    source={story.image}
                    style={style.learnMoreBackground}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {LearnMoreData[story.index]?.Title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={{ marginTop:20, fontSize: 30, fontWeight: 'bold', color: '#330066', textDecorationLine:'underline'}}>Browse Stories</Text>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Featured Stories
              </Text>
            </View>
            {/* Horizontal ScrollView for featuredStories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {featuredStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: featuredStoryData[story.index]?.title, 
                    content: featuredStoryData[story.index]?.story, 
                    image: story.image ,
                    link: featuredStoryData[story.index]?.link
                  })}
                  
                  /* Add your navigation logic here */
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}

                      >
                      <Text style={style.title}>
                      {featuredStoryData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                For You
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {forYouStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: forYouData[story.index]?.title, 
                    content: forYouData[story.index]?.story, 
                    image: story.image ,
                    link: forYouData[story.index]?.link
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {forYouData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Depression
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {depressedStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: depressedData[story.index]?.title, 
                    content: depressedData[story.index]?.story, 
                    image: story.image ,
                    link: depressedData[story.index]?.link
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {depressedData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Addiction
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {addictionStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: addictionData[story.index]?.title, 
                    content: addictionData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {addictionData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
  <Text style={style.Heading}>
    Anger
  </Text>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
  {angerStories.map((story, index) => (
    <TouchableOpacity
      key={index}
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate('StoryDetails', { 
        title: angerData[story.index]?.title, 
        content: angerData[story.index]?.story, 
        image: story.image ,
      })}
    >
      <ImageBackground
        source={story.image}
        style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
        resizeMode="cover"
      >
        <View
            style={style.overlay}
          >
          <Text style={style.title}>
          {angerData[story.index]?.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ))}
</ScrollView>

<View style={{ marginTop: 10, marginBottom: 10 }}>
  <Text style={style.Heading}>
    Lonely
  </Text>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
  {lonelyStories.map((story, index) => (
    <TouchableOpacity
      key={index}
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate('StoryDetails', { 
        title: lonelyData[story.index]?.title, 
        content: lonelyData[story.index]?.story, 
        image: story.image ,
      })}
    >
      <ImageBackground
        source={story.image}
        style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
        resizeMode="cover"
      >
        <View
            style={style.overlay}
          >
          <Text style={style.title}>
          {lonelyData[story.index]?.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ))}
</ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Anxiety
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {anxietyStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: anxietyData[story.index]?.title, 
                    content: anxietyData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {anxietyData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                ADHD
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {ADHDStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: ADHDData[story.index]?.title, 
                    content: ADHDData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {ADHDData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Personal Stories
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {personalStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: personalstoriesData[story.index]?.title, 
                    content: personalstoriesData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {personalstoriesData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
  <Text style={style.Heading}>
    Burnout
  </Text>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
  {burnoutStories.map((story, index) => (
    <TouchableOpacity
      key={index}
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate('StoryDetails', { 
        title: burnoutData[story.index]?.title, 
        content: burnoutData[story.index]?.story, 
        image: story.image ,
      })}
    >
      <ImageBackground
        source={story.image}
        style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
        resizeMode="cover"
      >
        <View
            style={style.overlay}
          >
          <Text style={style.title}>
          {burnoutData[story.index]?.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ))}
</ScrollView>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={style.Heading}>
                  Procrastination
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                {procrastinationStories.map((story, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('StoryDetails', { 
                      title: procrastinationData[story.index]?.title, 
                      content: procrastinationData[story.index]?.story, 
                      image: story.image ,
                    })}
                  >
                    <ImageBackground
                      source={story.image}
                      style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                      resizeMode="cover"
                    >
                      <View
                          style={style.overlay}
                        >
                        <Text style={style.title}>
                        {procrastinationData[story.index]?.title}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={style.Heading}>
                  Worrying
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                {worryingStories.map((story, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('StoryDetails', { 
                      title: worryingData[story.index]?.title, 
                      content: worryingData[story.index]?.story, 
                      image: story.image ,
                    })}
                  >
                    <ImageBackground
                      source={story.image}
                      style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                      resizeMode="cover"
                    >
                      <View
                          style={style.overlay}
                        >
                        <Text style={style.title}>
                        {worryingData[story.index]?.title}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Bipolar Disorder
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {bipolarStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: bipolarData[story.index]?.title, 
                    content: bipolarData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {bipolarData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                Eating Disorder
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {eatingStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: eatingData[story.index]?.title, 
                    content: eatingData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {eatingData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={style.Heading}>
                PTSD
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {ptsdStories.map((story, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('StoryDetails', { 
                    title: ptsdData[story.index]?.title, 
                    content: ptsdData[story.index]?.story, 
                    image: story.image ,
                  })}
                >
                  <ImageBackground
                    source={story.image}
                    style={{ width: 150, height: 200, borderRadius: 10, overflow: 'hidden' }}
                    resizeMode="cover"
                  >
                    <View
                        style={style.overlay}
                      >
                      <Text style={style.title}>
                      {ptsdData[story.index]?.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* ... (similar sections for other categories) */}
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default StoryPage;

const style=StyleSheet.create({
  Heading : {
    marginTop:10,
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#b30047',
  },
  overlay:{
    position: 'absolute', 
    bottom: 12, 
    left: 12, 
    padding: 12, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    right: 12,
    top:12,
    borderRadius: 10,
    justifyContent:'center'
  },
  
  learnMoreBackground:{
    width: 200, 
    height: 150,
     borderRadius: 10,
     overflow: 'hidden' 
  },
  learnMoreoverlay:{
    position: 'absolute', 
    bottom: 12, 
    left: 12, 
    padding: 12, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    right: 12,
    top:12,
    borderRadius: 10,
    justifyContent:'center'
  },
  title :{ 
    color: 'black',
   fontSize: 16, 
   fontWeight: 'bold',
   justifyContent:'center',
   textAlign:'center',
   textTransform:'capitalize',
   },
});