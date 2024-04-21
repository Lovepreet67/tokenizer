import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {getUser} from '../../redux/user/userSlice.ts';
import {API_URL} from '@env';

const ImageSlider: React.FC = ({}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState([
    'https://nitj.ac.in/public/assets/images/logo_250.png',
  ]);
  const user = useSelector(getUser);
  const fetchImages = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const resopnse = await fetch(`${API_URL}/account/images`, requestOptions);
      const result = await resopnse.json();
      console.log('result : ', result);
      if (resopnse.status !== 200) {
        throw new Error();
      }
      setImages(() => result.images);
    } catch (error) {
      console.log(error);
    }
  }, [user.jwt]);
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);
  const handlePageChange = (event: any) => {
    const {nativeEvent} = event;
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== currentPage) {
      setCurrentPage(slide);
    }
  };

  return (
    <View style={styles.outer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handlePageChange}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <Image key={index} source={{uri: image}} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentPage && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  outer: {
    padding: 3,
  },
  image: {
    width: width - 17,
    height: 400,
    borderRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal:5
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});

export default ImageSlider;
