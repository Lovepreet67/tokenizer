import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigation} from '../../navigators/StackNavigatorHome.tsx';
import {Controller, useForm} from 'react-hook-form';
import {COLORS} from '../../constants/colors.ts';
import {scaled, SIZES, verticalSacled} from '../../constants/sizes.ts';
import {useSelector} from 'react-redux';
import {getUser} from '../../redux/user/userSlice.ts';
import {ArrowRightIcon, SearchIcon, XCutIcon} from '../../resources/svgs';
import FormError from '../utilities/FormError.tsx';
import {API_URL} from '@env';
import {hideToast, showLoading} from '../../toast/toastApi.ts';

/**
 * type for the form data .
 */
type formData = {
  username: string;
};
/**
 * @description Search bar component display a form (takes string input basically a username user want to search) and search icon on right side
 * on searching it will show a slide down menu which will contain a matching users ot error according to result each matching entry in the list contain arrow icon on the right side which will redirect user to the transaction page for mentioned user.
 * search icon will be converted to the cut icon which will clear the form and hide result menu.
 */
const SearchBar = () => {
  const navigation = useNavigation<HomeStackNavigation>();
  const [searchResult, setSearchResult] = useState<
    undefined | {name: string; username: string}
  >(undefined);
  const user = useSelector(getUser);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm<formData>({mode: 'onSubmit'});
  /**
   * @description Function to handle the submission of the search form request the api to get matching users and set searchResult state accordingly.
   */
  const onSearchFormSubmit = useCallback(
    async (data: formData) => {
      showLoading(`Searching ${data.username}`);
      const myHeaders = new Headers();
      myHeaders.append('authorization', user.jwt);
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      try {
        const response = await fetch(
          `${API_URL}/account/searchUser?username=${data.username}`,
          requestOptions,
        );
        hideToast();
        if (response.status !== 200) {
          return setError('username', {
            type: 'Server Error',
            message: 'Try again later',
          });
        }
        const result = await response.json();
        if (!result.exist) {
          return setError('username', {
            type: 'invalid',
            message: 'Invalid username',
          });
        }
        setSearchResult({name: result.name, username: data.username});
      } catch (error) {
        hideToast();
        return setError('username', {
          type: 'Server Error',
          message: 'Try again later',
        });
      }
    },
    [setError, user.jwt],
  );
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="username"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Search user"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={currentValue => onChange(currentValue)}
              style={styles.input}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter username',
            },
          }}
        />
        {!searchResult ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={handleSubmit(onSearchFormSubmit)}>
            <SearchIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setSearchResult(undefined);
              reset({username: ''});
            }}>
            <XCutIcon />
          </TouchableOpacity>
        )}
      </View>
      <FormError text={errors.username?.message} />
      {searchResult && (
        <View style={styles.searchResultContainer}>
          <Text style={styles.searchResultText}>{searchResult.name}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('Interactions', {
                friendUsername: searchResult?.username,
              });
            }}>
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: verticalSacled(10),
    marginTop:'3%'
  },
  container: {
    borderWidth: scaled(2),
    borderColor: COLORS.primaryBlack,
    paddingHorizontal: scaled(10),
    marginHorizontal: scaled(10),
    borderRadius: scaled(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultContainer: {
    borderWidth: scaled(2),
    borderColor: COLORS.primaryBlack,
    paddingHorizontal: scaled(10),
    paddingVertical: verticalSacled(3),
    marginHorizontal: scaled(10),
    borderRadius: scaled(10),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchResultText: {
    fontSize: SIZES.primaryFont,
  },
  input: {
    fontSize: SIZES.primaryFont,
    width: '90%',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchBar;
