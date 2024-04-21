import React, {useEffect} from 'react';
import {Friend, Screen, SearchBar} from '../../components';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchFriends,
  getFriendObject,
} from '../../redux/friends/friendsSlice.ts';
import {scaled} from '../../constants/sizes.ts';
import ImageSlider from '../../components/home/ImageSlider.tsx';
// sub sections

/**
 * @description flex view to show the friend list of the logged in user.
 * basically shows the friend icon(custom component) in a row major flex view.
 */
const FriendList = () => {
  const {friendsList, error, loading} = useSelector(getFriendObject);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (friendsList.length === 0) {
      console.log('fetching friend');
      dispatch(fetchFriends());
    }
  }, [dispatch, friendsList.length]);
  console.log(friendsList);
  return (
    <View style={friendListStyles.listContainer}>
      {loading ? (
        <Text>Loading</Text>
      ) : error.length !== 0 ? (
        <Text>{error}</Text>
      ) : friendsList.length === 0 ? (
        <Text>Nothing to show search and add friends</Text>
      ) : (
        friendsList.map(friend => <Friend name={friend} key={friend} />)
      )}
    </View>
  );
};

const friendListStyles = StyleSheet.create({
  listContainer: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  }
});

/**
 * @description main screen which displayed when user log in. It include search bar and friend list in it.
 */
const Home = () => {
  return (
    <Screen>
      <SearchBar />
      <FriendList />
      <ImageSlider
        images={[
          'https://images.unsplash.com/photo-1711997632197-e09b5c59605d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
          'https://images.unsplash.com/photo-1711873314750-39f3b0d45f09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
        ]}
      />
    </Screen>
  );
};

export default Home;
