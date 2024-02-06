import { LucideProps, UserPlus } from 'lucide-react'

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    y="5"
    x="10"
    {...props}
  >
    <style type="text/css">
      {
        "\n\t.cubies_negentien{fill:#F2C99E;}\n\t.cubies_twintig{fill:#F9E0BD;}\n\t.cubies_tweeentwintig{fill:#D97360;}\n\t.cubies_achtien{fill:#EDB57E;}\n\t.cubies_een{fill:#4C4842;}\n\t.cubies_twaalf{fill:#FFF2DF;}\n\t.st0{fill:#65C3AB;}\n\t.st1{fill:#725A48;}\n\t.st2{fill:#8E7866;}\n\t.st3{fill:#98D3BC;}\n\t.st4{fill:#C9483A;}\n\t.st5{fill:#CCE2CD;}\n\t.st6{fill:#EC9B5A;}\n\t.st7{fill:#67625D;}\n\t.st8{fill:#C9C6C0;}\n\t.st9{fill:#EDEAE5;}\n\t.st10{fill:#A4C83F;}\n\t.st11{fill:#BCD269;}\n\t.st12{fill:#D1DE8B;}\n\t.st13{fill:#E69D8A;}\n\t.st14{fill:#E3D4C0;}\n\t.st15{fill:#C6B5A2;}\n\t.st16{fill:#837F79;}\n\t.st17{fill:#A5A29C;}\n\t.st18{fill:#2EB39A;}\n\t.st19{fill:#AB9784;}\n"
      }
    </style>
    <g>
      <path
        className="cubies_negentien"
        d="M29,32H3c-1.657,0-3-1.343-3-3V0h2l4,4h20l4-4h2v29C32,30.657,30.657,32,29,32z"
      />
      <path
        className="cubies_twintig"
        d="M27,32H3c-1.657,0-3-1.343-3-3V0l4,4h22l4-4v29C30,30.657,28.657,32,27,32z"
      />
      <path
        className="cubies_een"
        d="M20,8c1.105,0,2,0.895,2,2s-0.895,2-2,2s-2-0.895-2-2S18.895,8,20,8z M8,10c0,1.105,0.895,2,2,2 s2-0.895,2-2s-0.895-2-2-2S8,8.895,8,10z"
      />
      <path
        className="cubies_twaalf"
        d="M20.5,9C20.776,9,21,9.224,21,9.5S20.776,10,20.5,10S20,9.776,20,9.5S20.224,9,20.5,9z M10,9.5 c0,0.276,0.224,0.5,0.5,0.5S11,9.776,11,9.5S10.776,9,10.5,9S10,9.224,10,9.5z"
      />
      <path
        className="cubies_tweeentwintig"
        d="M17.354,17.646L15.5,15.793v-1.058C16.092,14.392,17,13.748,17,13c0-1.105-0.895-1-2-1 s-2-0.105-2,1c0,0.748,0.908,1.392,1.5,1.735v1.058l-1.854,1.854c-0.195,0.195-0.195,0.512,0,0.707 C12.744,18.451,12.872,18.5,13,18.5s0.256-0.049,0.354-0.146L15,16.707l1.646,1.646C16.744,18.451,16.872,18.5,17,18.5 s0.256-0.049,0.354-0.146C17.549,18.158,17.549,17.842,17.354,17.646z"
      />
      <path
        className="cubies_achtien"
        d="M32,9h-2V7h2V9z M32,11h-2v2h2V11z M32,15h-2v2h2V15z M32,19h-2v2h2V19z M32,23h-2v2h2V23z M32,27 h-2v2h2V27z"
      />
      <path
        className="cubies_negentien"
        d="M4,12c0,0.552-0.448,1-1,1H0v-2h3C3.552,11,4,11.448,4,12z M3,15H0v2h3c0.552,0,1-0.448,1-1 C4,15.448,3.552,15,3,15z M3,19H0v2h3c0.552,0,1-0.448,1-1C4,19.448,3.552,19,3,19z M3,23H0v2h3c0.552,0,1-0.448,1-1 C4,23.448,3.552,23,3,23z M3,27H0v2h3c0.552,0,1-0.448,1-1C4,27.448,3.552,27,3,27z M3,7H0v2h3c0.552,0,1-0.448,1-1 C4,7.448,3.552,7,3,7z M26,16c0,0.552,0.448,1,1,1h3v-2h-3C26.448,15,26,15.448,26,16z M26,12c0,0.552,0.448,1,1,1h3v-2h-3 C26.448,11,26,11.448,26,12z M27,7c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1h3V7H27z M26,24c0,0.552,0.448,1,1,1h3v-2h-3 C26.448,23,26,23.448,26,24z M26,28c0,0.552,0.448,1,1,1h3v-2h-3C26.448,27,26,27.448,26,28z M26,20c0,0.552,0.448,1,1,1h3v-2h-3 C26.448,19,26,19.448,26,20z"
      />
    </g>
  </svg>
  ),
  UserPlus
}

export type Icon = keyof typeof Icons

