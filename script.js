let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let imagemLateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')
let alerta = document.querySelector('.alerta')

let etapaAtual = 0
let numero = ''
let votoBranco = true

function comecar(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for(let i = 0; i<etapa.numeros;i++){
        if(i == 0){
            numeroHtml += '<div class="numero pisca"><span class="conteudo">.</span></div>'
        } else {
            numeroHtml += '<div class="numero"><span class="conteudo">.</span></div>'
        }
    }
    cargo.innerHTML = etapa.titulo
    seuVotoPara.style.display = 'none'
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    imagemLateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true
        } else {
            return false
        }
    })
    if(candidato.length>0){
        candidatoSelecionado = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidatoSelecionado.nome}</br>Partido: ${candidatoSelecionado.partido}`

        let fotosHtml = ''

        for(let i in candidatoSelecionado.fotos){
            if(candidatoSelecionado.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="./images/${candidatoSelecionado.fotos[i].url}" alt="">${candidatoSelecionado.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="./images/${candidatoSelecionado.fotos[i].url}" alt="">${candidatoSelecionado.fotos[i].legenda}</div>`
            }
        }

        imagemLateral.innerHTML = fotosHtml

    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null){
        elNumero.innerHTML = n
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function branco(){
    if(numero === ''){
        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    } else if(numero === 'VOTOU'){
        abrirAlerta('Voto já foi validado!')
    } else {
        abrirAlerta('Para votar em BRANCO é necessário<br>que você não tenha digitado.CORRIJA<br>e tente novamente!<br>')
    }
}

function corrige(){
    if(numero === 'VOTOU'){
        abrirAlerta('Voto já foi validado!')
    } else {
        comecar()
    }
}

function horario(){
    let data = new Date()
    let semana = ["DOM","SEG","TER","QUA","QUI","SEX","SÁB"]
    let dia = data.getDate()
    dia = dia < 10 ? `0${dia}`:`${dia}`
    let mes = data.getMonth()
    mes = mes < 10 ? `0${mes}`:`${mes}`
    let ano = data.getFullYear()
    let hora = data.getHours()
    hora = hora < 10 ? `0${hora}`:`${hora}`
    let minutos = data.getMinutes()
    let minuto = minutos < 10 ? `0${minutos}`: minutos
    let segundos = data.getSeconds()
    let segundo = segundos < 10 ? `0${segundos}`:segundos
    document.querySelector('.d-1-1').innerHTML = `<div class="horario"><b>${semana[data.getDay()]}  ${dia}/${mes}/${ano}  ${hora}:${minuto}:${segundo}</b></div>`
}

function carregandoVoto(){
    setInterval(() => {
        horario()
    }, 1)
    document.querySelector('.d-1-3').innerHTML = '<div class="aviso-gigante pisca" style="font-size: 90px">FIM</div>'
    cargo.innerHTML = ''
    imagemLateral.style.display = 'none'
    descricao.innerHTML = ''
    aviso.style.border = '0px'
    aviso.innerHTML = '<div class="votou">VOTOU</div>'
    numero = 'VOTOU'
    const music = new Audio('./sound/urna-eletronica.mp3');
    music.play();
}

function confirma(){

    if(numero === 'VOTOU'){
        abrirAlerta('Voto já foi validado!')
    } else {
        let etapa = etapas[etapaAtual]
        let votoConfirmado = false

        if(votoBranco === true){
            votoConfirmado = true
        } else if (numero.length === etapa.numeros){
            votoConfirmado = true
        }

        if(votoConfirmado){
            etapaAtual++
            if(etapas[etapaAtual] !== undefined){
                comecar()
            } else {
                cargo.innerHTML = ''
                imagemLateral.style.display = 'none'
                numeros.innerHTML = '<div class="carregando"><div class="processando"><div class="loading"></div>></div><div>GRAVANDO...</div></div>'
                descricao.innerHTML = ''
                seuVotoPara.style.display = 'none'
                aviso.style.display = 'none'
                setTimeout(() => {
                    carregandoVoto()
                }, 2000);
            }
        }
    }

}

function abrirAlerta(texto) {
    document.querySelector('.alerta').style.display = 'flex'
    document.querySelector('.alerta-texto span').innerHTML = texto
}

function fecharAlerta() {
    document.querySelector('.alerta').style.display = 'none'
}

comecar()