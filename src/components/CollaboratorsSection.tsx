import { useEffect } from 'react';

export default function CollaboratorsSection() {

  return (
    <section id="collaborators" data-testid="collaborators-section">
      <div>
        <div>
          <h2>
            Our 
            <span> Collaborations</span>
          </h2>
        </div>

        <div>
          <div>
            <div>
              <span>T</span>
            </div>
            <h3>TechCorp</h3>
            <p>Technology Partner</p>
          </div>

          <div>
            <div>
              <span>CN</span>
            </div>
            <h3>Coding Ninjas</h3>
            <p>Educational Platform</p>
          </div>

          <div>
            <div>
              <span>PX</span>
            </div>
            <h3>PandoraX</h3>
            <p>Innovation & Revolution</p>
          </div>
        </div>
      </div>
    </section>
  );
}
