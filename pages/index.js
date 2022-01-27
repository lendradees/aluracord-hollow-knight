import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';


function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>
                {props.children}
            </Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            } 
            `}</style>
        </>
    );
}


export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
/*     const userURL = `https://api.github.com/users/${username}`;
    const [userBio, setUserBio] = React.useState('');
    const [userHTML_URL, setUserHTML_URL] = React.useState(''); */



const imageError = 'https://static.wikia.nocookie.net/hollowknight/images/f/f3/Npc_quirrel.png'; 

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[550],
                    backgroundImage: 'url(https://www.teahub.io/photos/full/297-2971513_hollow-knight-blue-lake.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['750t'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento){
                            infosDoEvento.preventDefault();
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Seja bem vindo de volta {username}</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>
                        
                        <TextField
                            placeholder="Insira o seu UserName"
                            value={username}
                            onChange={function handler(event) {
                                const valor = event.target.value;
                                if (event.target.value.length > 2) {
                              /*       fetch(`${userURL}`, {method: 'GET'})
                                        .then(response => response.json)
                                        .then(data => {
                                            setUserBio(data.bio)
                                            setUserHTML_URL(data.html_url)
                                        })
                                } */
                                setUsername(valor);
                            }}}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals['750t'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '25%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 
                                ? `https://github.com/${username}.png` 
                                : imageError}
                        />
                        {username.length > 2 && ( 
                        <>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                            
                        </Text>

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {/* {userHTML_URL}  */}
                        </Text>
                        </>
                        )} 
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}