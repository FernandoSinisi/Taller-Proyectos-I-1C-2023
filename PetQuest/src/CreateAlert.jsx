import { useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image } from 'react-native';
import { Button, Divider, RadioButton, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MapView, { Circle } from 'react-native-maps';
import { UserContext } from './UserContext';
import { useDataStore } from './useStorage';
import uuid from 'react-native-uuid';

const alertValidationSchema = yup.object().shape({
  type: yup.string().oneOf(['lost', 'found']).required('Debe especificar el tipo de alerta'),
  title: yup
    .string()
    .required('Debe especificar el tipo de mascota')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  species: yup.string().required('Debe especificar el tipo de mascota'),
  otherSpecies: yup.string(),
  race: yup.string().min(3, 'La raza debe tener al menos 3 caracteres'),
  description: yup
    .string()
    .min(20, ({ min, value }) => `${min - value.length} caracteres faltantes`)
    .required('Debe detallar lo máximo posible la alerta'),
  petImage: yup.string(),
});

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return date + '/' + month + '/' + year;
};

export default function CreateAlert({ navigation, route }) {
  const [petImages, setPetImages] = useState([]);
  const [location, setLocation] = useState({ latitude: -34.603722, longitude: -58.381592 });
  const user = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      species: '',
      otherSpecies: '',
      race: '',
      color: '',
      description: '',
      others: [],
      lostPlaceDistance: 10,
      lostDate: getCurrentDate(),
      location: location,
      isDefault: false,
    },
    onSubmit: (values) => {
      const alert = {
        ...values,
        pictures: petImages,
        location: location,
        userId: user.id,
      };
      console.log('userId', user.id);
      addAlert(alert);
      navigation.navigate({ name: 'AlertList' });
    },
    validationSchema: alertValidationSchema,
  });

  const { mutateAsync } = useDataStore({
    keysToInvalidate: ['alertcarddata'],
    onSuccess: () => console.log('success!'),
    onError: () => console.log('error!'),
  });

  const addAlert = (alert) => {
    mutateAsync({
      key: 'alertcarddata',
      value: { ...alert, id: uuid.v1() },
    }).then(() => {
      console.log('Saved new alert');
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the petImage library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPetImages(result.assets.map((a) => a.base64));
    }
  };

  const onRegionChange = (region) => {
    console.log('seteando nueva region: ', region);
    setLocation({ latitude: region.latitude, longitude: region.longitude });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onRegionChangeComplete={onRegionChange}
        >
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={500}
            fillColor="rgba(255, 0, 0, 0.2)"
          />
        </MapView>
        <View style={styles.createAlertContainer}>
          <Text style={styles.mapInfo}>Seleccione en el mapa el área</Text>

          <View style={styles.imageContainer}>
            <Button mode="text" onPress={pickImage} icon="plus">
              Subir foto
            </Button>
            <View style={styles.images}>
              {petImages.map((img, i) => (
                <Image
                  key={i}
                  source={{ uri: `data:image/jpeg;base64,${img}` }}
                  style={styles.image}
                />
              ))}
            </View>
          </View>

          <View style={styles.fieldRadioButtonContainer}>
            <Text style={styles.fieldName}>Tipo de alerta: </Text>
            <RadioButton.Group
              style={styles.radioButtonGroupContainer}
              onValueChange={formik.handleChange('type')}
              value={formik.values.type}
            >
              <View style={styles.radioButtonGroupContainer}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="lost"></RadioButton>
                  <Text>Mascota Perdida</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="found"></RadioButton>
                  <Text>Mascota Encontrada</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {formik.errors.type && formik.touched.type && (
            <Text style={styles.errorText}>{formik.errors.type}</Text>
          )}
          <Divider style={styles.divider} />
          <View style={styles.fieldRadioButtonContainer}>
            <Text style={styles.fieldName}>Especie: </Text>
            <RadioButton.Group
              style={styles.radioButtonGroupContainer}
              onValueChange={formik.handleChange('species')}
              value={formik.values.species}
            >
              <View style={styles.radioButtonGroupContainer}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="perro"></RadioButton>
                  <Text>Perro</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="gato"></RadioButton>
                  <Text>Gato</Text>
                </View>
                <View style={styles.radioButtonContainerWithTextInput}>
                  <RadioButton value="otro"></RadioButton>
                  <Text>Otra</Text>
                  <TextInput
                    style={styles.radioButtonTextInput}
                    label="Especifique"
                    value={formik.values.otherSpecies}
                    onChangeText={formik.handleChange('otherSpecies')}
                    disabled={!!(formik.values.species !== 'other')}
                  />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {formik.errors.species && formik.touched.species && (
            <Text style={styles.errorText}>{formik.errors.species}</Text>
          )}
          <Divider style={styles.divider} />
          <TextInput
            style={styles.textInput}
            label="Título de Alerta"
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          {formik.errors.title && formik.touched.title && (
            <Text style={styles.errorText}>{formik.errors.title}</Text>
          )}
          <TextInput
            style={styles.textInput}
            label="Raza"
            value={formik.values.race}
            onChangeText={formik.handleChange('race')}
            onBlur={formik.handleBlur('race')}
          />
          {formik.errors.race && formik.touched.race && (
            <Text style={styles.errorText}>{formik.errors.race}</Text>
          )}
          <TextInput
            style={styles.textInput}
            label="Color"
            value={formik.values.color}
            onChangeText={formik.handleChange('color')}
            onBlur={formik.handleBlur('color')}
          />
          {formik.errors.color && formik.touched.color && (
            <Text style={styles.errorText}>{formik.errors.color}</Text>
          )}
          {formik.values.type === 'lost' && (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              label="Recompensa (AR$)"
              value={formik.values.reward}
              onChangeText={formik.handleChange('reward')}
              onBlur={formik.handleBlur('reward')}
            />
          )}
          {formik.values.type === 'lost' && formik.errors.reward && formik.touched.reward && (
            <Text style={styles.errorText}>{formik.errors.reward}</Text>
          )}
          <TextInput
            style={styles.longTextInput}
            label="Más detalles"
            value={formik.values.description}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          />
          {formik.errors.description && formik.touched.description && (
            <Text style={styles.errorText}>{formik.errors.description}</Text>
          )}
          <View style={styles.buttonsContainer}>
            <Button
              mode="text"
              onPress={() => navigation.pop()}
              color="red"
              style={{ color: 'red' }}
              icon={'close'}
            >
              <Text style={{ color: '#f4511e' }}>Cancelar</Text>
            </Button>
            <Button
              mode="contained"
              title="Crear Alerta"
              onPress={formik.handleSubmit}
              style={{ backgroundColor: '#f4511e' }}
            >
              Crear alerta
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createAlertContainer: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 15,
    elevation: 10,
    gap: 15,
    // backgroundColor: '#e6e6e6',
  },
  divider: { bold: true },
  fieldName: { alignSelf: 'flex-start' },
  mapInfo: { alignSelf: 'center' },
  textInput: { type: 'outlined', width: '100%' },
  longTextInput: { type: 'outlined', width: '100%', height: 150 },
  fieldRadioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
  },
  radioButtonGroupContainer: {
    flexDirection: 'column',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioButtonContainerWithTextInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioButtonTextInput: { marginLeft: 20, height: 10, width: 150 },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'center',
  },
  images: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  image: { width: 70, height: 70 },
  map: {
    height: 200,
  },
});
