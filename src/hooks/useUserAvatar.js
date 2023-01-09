import {useState, useEffect} from 'react';

function useUserAvatar(userId) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function fetchAvatar() {
      try {
        const response = await fetch(`http://localhost:4000/api/user/avatar/${userId}`);
        const data = await response.blob();
        setAvatar(URL.createObjectURL(data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchAvatar();
  }, [userId]);

  return avatar;
}

export default useUserAvatar;