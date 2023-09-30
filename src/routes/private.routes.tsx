import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chat from "../screens/Chat";
import { Routes } from "./index.routes";
import Profile from "../screens/Profile";
import WebPage from "../screens/WebPage";
import VetCases from "../screens/VetCases";
import { AboutVet } from "../screens/AboutVet";
import VideoCamera from "../screens/VideoCamera";
import { EvidencesScreen } from "../screens/Evidences";
import SplashScreen from "../screens/SplashScreen";
import { AboutClinic } from "../screens/AboutClinic";
import { AboutAnimal } from "../screens/AboutAnimal";
import { AboutCategory } from "../screens/AboutCategory";
import { VetCaseDetails } from "../screens/VetCaseDetails";
import { VeterinarianRecords } from "../screens/VeterinarianRecords";
import { VetCaseScreenHeader } from "../components/VetCaseScreenHeader";
import { VetCaseHeaderRightSide } from "../components/VetCaseScreenHeader/RightSide";

const Stack = createNativeStackNavigator<Routes>();

export const PrivateRoutes = () => (
    <Stack.Navigator initialRouteName="VetCases">
        <Stack.Group screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFF' } }}>
            <Stack.Screen name={"VetCases"} component={VetCases} />
            <Stack.Screen name={"VideoCamera"} component={VideoCamera} />
        </Stack.Group>

        <Stack.Group>
            <Stack.Screen
                name={"Chat"}
                component={Chat}
                options={({ route }) => ({
                    headerBackTitle: 'Voltar',
                    headerTitleAlign: "left",
                    headerTitle: () => <VetCaseScreenHeader {...route.params} />,
                })}
            />

            <Stack.Screen
                name={"Profile"}
                component={Profile}
                options={{
                    title: 'Configurações',
                    headerBackTitle: 'Conversas',
                    headerStyle: { backgroundColor: 'rgb(238, 237, 243)' },
                    contentStyle: { backgroundColor: 'rgb(238, 237, 243)' },
                }}
            />

            <Stack.Screen
                name={"WebPage"}
                component={WebPage}
                options={({ route }) => ({
                    headerBackTitle: 'Voltar',
                    title: route.params.screenTitle,
                    headerStyle: { backgroundColor: 'rgb(238, 237, 243)' },
                })}
            />
        </Stack.Group>

        <Stack.Group
            screenOptions={{
                headerBackTitle: 'Detalhes',
                contentStyle: { backgroundColor: 'rgb(238, 237, 243)' }
            }}
        >
            <Stack.Screen
                name={"VetCaseDetails"}
                component={VetCaseDetails}
                options={{ title: 'Detalhes', headerBackTitle: 'Conversa' }}
            />

            <Stack.Screen
                name={"VetCaseAnimal"}
                component={AboutAnimal}
                options={{ title: 'Animal' }}
            />

            <Stack.Screen
                name={"VetCaseClinic"}
                component={AboutClinic}
                options={{ title: 'Clínica' }}
            />

            <Stack.Screen
                name={"VetCaseVeterinarian"}
                component={AboutVet}
                options={{ title: 'Veterinário' }}
            />

            <Stack.Screen
                component={AboutCategory}
                name={"VetCaseCategory"}
                options={{ title: 'Categoria do Caso' }}
            />

            <Stack.Screen
                component={EvidencesScreen}
                name={"VetCaseEvidences"}
                options={{ title: 'Evidências' }}
            />

            <Stack.Screen
                component={VeterinarianRecords}
                name={"VetCaseVeterinarianRecords"}
                options={{ title: 'Ficha Veterinária' }}
            />
        </Stack.Group>
    </Stack.Navigator>
);
