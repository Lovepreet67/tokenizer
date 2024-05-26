import React, {useCallback, useEffect, useState} from 'react';
import {Friend, Screen, SearchBar} from '../../components';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchFriends,
  getFriendObject,
} from '../../redux/friends/friendsSlice.ts';
import ImageSlider from '../../components/home/ImageSlider.tsx';
import {API_URL} from '@env';
import {getUser} from '../../redux/user/userSlice.ts';
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
      dispatch(fetchFriends());
    }
  }, [dispatch, friendsList.length]);
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

const VendorList = () => {
  const [vendorList, setVendorList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useSelector(getUser);
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const resopnse = await fetch(
        `${API_URL}/account/vendors`,
        requestOptions,
      );
      const result = await resopnse.json();
      if (resopnse.status !== 200) {
        throw new Error();
      }
      setVendorList(() => result.vendors);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [user.jwt]);
  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);
  console.log(vendorList);
  return (
    <View style={friendListStyles.listContainer}>
      {loading ? (
        <Text>Loading</Text>
      ) : error.length !== 0 ? (
        <Text>{error}</Text>
      ) : vendorList.length === 0 ? (
        <Text>Nothing to show search and add friends</Text>
      ) : (
        vendorList.map(friend => <Friend name={friend} key={friend} />)
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
  },
});

/**
 * @description main screen which displayed when user log in. It include search bar and friend list in it.
 */
const Home = () => {
  return (
    <Screen>
      <ScrollView>
        <SearchBar />
        <FriendList />
        <ImageSlider />
        <Text style={textStyle.subheader}>Vendors</Text>
        <VendorList />
      </ScrollView>
    </Screen>
  );
};
const textStyle = StyleSheet.create({
  subheader: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
});

export default Home;
