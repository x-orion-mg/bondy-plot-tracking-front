import {useState} from 'react';
import Icon from '../Icomoon/Icomoon';
import './ImpactTable.scss';
import {ProjectPartner} from "../../models/ProjectPartner.model.ts";
import {formatter} from "../../utils/numberFormatter.ts";

type ValueProps = {
  icon: string;
  value: number | string;
  description: string;
}

type ImpactTableProps = {
  projectChild: ProjectPartner['projectChild']
}

function ImpactTable({projectChild}: ImpactTableProps) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="impactTable">
      <div className="impactTable_switch">
        <div className={`tab_btn ${activeTab === 1 && 'active'}`} onClick={() => setActiveTab(1)}>Impact
          environnemental
        </div>
        <div className={`tab_btn ${activeTab === 2 && 'active'}`} onClick={() => setActiveTab(2)}>Impact
          social
        </div>
        <div className={`tab_btn ${activeTab === 3 && 'active'}`} onClick={() => setActiveTab(3)}>Impact
          économique
        </div>
      </div>

      <div className="impactTable_element">
        {
          activeTab === 1 && (
            <div className="element">
              <Value icon='multi_tree' value={formatter.format(projectChild.environmentalImpactPlantedTrees)}
                     description="Nombre d'arbres plantés"/>
              <Value icon='chart' value={formatter.format(projectChild.environmentalImpactCO2)}
                     description='TCO2 séquestré(sur 20 ans)'/>
            </div>
          )
        }

        {
          activeTab === 2 && (
            <div className="element">
              <Value icon='chart' value={formatter.format(projectChild.socialImpactSeasonalJobs)} description='Emplois saisonniers'/>
              <Value icon='multi_tree' value={formatter.format(projectChild.socialImpactIndirectBeneficiaries)}
                     description='Bénéficiaires indirects'/>
            </div>
          )
        }

        {
          activeTab === 3 && (
            <div className="element">
              <Value icon='chart' value={formatter.format(projectChild.economicImpactSustainableEmployment)} description='Emplois durables'/>
              <Value icon='multi_tree' value={formatter.format(projectChild.economicImpactRestoredHectares)}
                     description='Hectare(s) restauré(s), générant une opportunité économique'/>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default ImpactTable;


function Value({icon, value, description}: ValueProps) {
  return (
    <div className="value">
      <div className="value_top">
        <Icon icon={icon} size={16} color='var(--color-primary)'/>
        <strong>{value}</strong>
      </div>
      <div className="value_bottom">{description}</div>
    </div>
  )
}