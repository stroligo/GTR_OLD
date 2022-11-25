import michela from "../assets/michela.jpeg";
import arash from "../assets/arash.jpeg";
import anderson from "../assets/anderson.png";
import gabriel from "../assets/gabriel.jpeg";

function PageProject() {
  return (
    <section>
      <div className="profile">
        <h4>Michela Camboim </h4>
        <img src={michela} alt="Michela" className="img-perfil" />
        <p>
          Pesquisadora, economista e cientista de dados do Núcleo de Estudos
          Econômicos e Populacionais da Fundação Joaquim Nabuco/Ministério da
          Educação e da Fundação Instituto Brasileiro de Geografia e Estatística
          – IBGE. Possui doutorado em economia pela UFPE, conhecimentos em
          estatística, econometria, machine learning, modelagem econômica e uso
          de ferramentas como Excel, Linguagem R, Python, SQL e Power BI.
          Experiência em gestão de equipes, desenvolver projetos, planejamento,
          preparar treinamentos e fazer apresentações de resultados de trabalhos
          e/ou ministrar cursos. Prática na escrita de relatórios técnicos,
          científicos e artigos com explicação de resultados técnicos em
          linguagem simples.
        </p>
        <div>https://www.linkedin.com/in/michela-camboim-ba1666242/</div>
      </div>
      <div className="profile">
        <h4> Arash Kaffashi</h4>
        <img src={arash} alt="Arash" className="img-perfil" />
        <p>
          Possui graduação em direito pela UNEMAT e atua como Oficial de Justiça
          Avaliador há 09 anos, reside em Tangará da Serra - MT, é apaixonado
          por desenvolvimento de software, informática, investimentos,
          tecnologia e viagens.
        </p>
        <div> https://github.com/Arash-kaffashi</div>
        <div>
          {" "}
          https://www.linkedin.com/in/arash-cipriano-cardoso-kaffashi-7873a9166/
        </div>
      </div>
      <div className="profile">
        <h4>Anderson Moro</h4>
        <img src={anderson} alt="Anderson" className="img-perfil" />
        <p>
          Possui mestrado em Gestão nas organizações pela Universidade Federal
          da Paraíba (2021), graduação em Sistemas de Informação pela
          Universidade Federal de Santa Maria (2015) e graduação em Sistemas
          para Internet pela Universidade Federal de Santa Maria (2014).
        </p>
        <p>
          Atualmente é técnico judiciário em tecnologia da informação no TR4
          onde trabalha no setor de desenvolvimento.
        </p>
        <div> https://github.com/nosderson</div>
      </div>
      <div className="profile">
        <h4>Gabriel Stroligo</h4>
        <img src={gabriel} alt="Gabriel" className="img-perfil" />
        <p>
          Desenvolvo trabalhos para Internet desde 2005 e já tive diversas
          experiências nas áreas de tecnologia, criação e marketing. Sou
          funcionário do Tribunal de Justiça do Estado do Tocantins, cofundador
          da Web Success na Irlanda, cofundador do 42 Bar e Board Games no
          Tocantins, especialista em Joomla, graduado em Artes e mestre em
          Modelagem Computacional, ambos pela Universidade Federal do Tocantins.
        </p>
        <p>
          Minha especialidade na web é no Front-End e todos os assuntos
          relacionados ao mesmo. Um pouco hiperativo por natureza, tento
          canalizar minhas energias em áreas que envolvam criatividade e
          inovação.
        </p>
        <div> https://www.linkedin.com/in/gabrielstroligo/</div>
      </div>
    </section>
  );
}

export default PageProject;
