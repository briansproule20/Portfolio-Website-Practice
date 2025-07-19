import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ELO - Brian Sproule',
  description: 'ELO - Electric Light Orchestra',
};

export default function EloPage() {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">ELO</h1>
            <p className="text-lg text-muted-foreground">
              Electric Light Orchestra
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">About ELO</h2>
              <p className="text-muted-foreground">
                Electric Light Orchestra (ELO) was a British rock band formed in Birmingham in 1970 by Jeff Lynne and Roy Wood. 
                The band's music is characterized by its fusion of rock and classical music, featuring orchestral arrangements 
                and innovative production techniques.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Notable Albums</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Out of the Blue (1977)</li>
                <li>A New World Record (1976)</li>
                <li>Discovery (1979)</li>
                <li>Time (1981)</li>
                <li>Eldorado (1974)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Classic Songs</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>"Mr. Blue Sky"</li>
                <li>"Don't Bring Me Down"</li>
                <li>"Turn to Stone"</li>
                <li>"Sweet Talkin' Woman"</li>
                <li>"Livin' Thing"</li>
                <li>"Telephone Line"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 