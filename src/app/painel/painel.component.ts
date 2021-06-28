import { Frase } from './../shared/frase.model';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a seguinte frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase = {fraseEng: '', frasePtBr: ''}

  public progresso: number = 0

  public tentativas: number = 3

  @Output()
  public encerrarJogo = new EventEmitter()

  constructor() {
    this.atualizaRodada()
 }

  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = ((<HTMLInputElement>resposta.target).value)

  }

  public verificarResposta(): void {

    if  (this.resposta == this.rodadaFrase.frasePtBr) {
      this.rodada++
      this.progresso = this.progresso + (100/this.frases.length)
      this.atualizaRodada()

      if (this.rodada === 4) {
        this.encerrarJogo.emit('Vitória')
      }

    }else {
      alert('A resposta está errada!')
      this.tentativas--

      if(this.tentativas === -1){
        this.encerrarJogo.emit('Derrota')
      }

    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''

  }
}
