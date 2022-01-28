import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODExMSwiZXhwIjoxOTU4ODY0MTExfQ.I33W4d1jtZCstnxVnagRIg5vPWjheb4BMxfKnIbnfs0';
const SUPABASE_URL = 'https://fijlkaorjunsjmvnvbpr.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function pegaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

/* Barra de Loading */
import LinearProgress from '@mui/material/LinearProgress';

export function LinearIndeterminate() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        const subscription = pegaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    return () => {
        subscription.unsubscribe();
    }
}, []);

function handleNovaMensagem(novaMensagem) {
    const mensagem = {
        /* id: listaDeMensagens.length + 1, */
        de: usuarioLogado,
        texto: novaMensagem,
    };

    supabaseClient
        .from('mensagens')
        .insert([
            mensagem
        ])
        .then(({ data }) => {

        });

    setMensagem('');
}
return (
    <Box
        styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[550],
            backgroundImage: `url(https://www.teahub.io/photos/full/297-2971513_hollow-knight-blue-lake.jpg)`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
        }}
    >
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '5px',
                backgroundColor: appConfig.theme.colors.neutrals['750t'],
                height: '100%',
                maxWidth: '95%',
                maxHeight: '95vh',
                padding: '32px',
            }}
        >
            <Header />
            <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                    height: '80%',
                    backgroundColor: appConfig.theme.colors.neutrals['600t'],
                    flexDirection: 'column',
                    borderRadius: '5px',
                    padding: '16px',
                }}
            >

                <MessageList mensagens={listaDeMensagens} />
                {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        value={mensagem}
                        onChange={(event) => {
                            const valor = event.target.value;
                            setMensagem(valor);
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }
                        }}
                        placeholder="Insira sua mensagem aqui..."
                        type="textarea"
                        styleSheet={{
                            width: '100%',
                            border: '0',
                            resize: 'none',
                            borderRadius: '5px',
                            padding: '6px 8px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            marginRight: '12px',
                            color: appConfig.theme.colors.neutrals[200],
                        }}
                    />
                    <ButtonSendSticker
                        onStickerClicker={(sticker) => (
                            handleNovaMensagem(':sticker:' + sticker)
                        )}
                    />
                    <Button
                        onClick={(event) => {
                            if (mensagem.length < 1) {
                                event.preventDefault();
                            } else {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                                document.querySelector('textarea').focus
                            }
                        }}
                        colorVariant="positive"
                        label="Enviar"
                        rounded="full"
                        type="submit"
                    />
                </Box>
            </Box>
        </Box>
    </Box>
)
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    /*     console.log(props); */
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderTop: `1px solid ${appConfig.theme.colors.neutrals[700]}`,
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/*  Condicional {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                );
            })}

        </Box>
    )
}